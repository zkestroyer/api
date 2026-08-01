import express from 'express';
import webhookHandler from './handlers/WebhookHandler.js';

const app = express();
const PORT = 3005;

// Middleware to capture raw body for signature verification while still parsing JSON
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// Override the handleEvent method to use rawBody if available (better signature verification)
const originalHandleEvent = webhookHandler.handleEvent.bind(webhookHandler);
app.post('/webhooks/student-events', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payloadString = req.rawBody || JSON.stringify(req.body);
  
  import('./services/SignatureVerifier.js').then(({ default: signatureVerifier }) => {
    if (!signatureVerifier.verify(payloadString, signature)) {
      console.warn('[Receiver Service] Invalid webhook signature detected');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = req.body;
    console.log(`\n[Receiver Service] Received event: ${event.event} at ${event.timestamp}`);
    console.log(`[Receiver Service] Payload data:`, JSON.stringify(event.data, null, 2));

    webhookHandler.eventHistory.push(event);
    res.status(200).json({ message: 'Event received successfully' });
  });
});

app.get('/webhooks/history', (req, res) => {
  res.json(webhookHandler.getHistory());
});

app.listen(PORT, () => {
  console.log(`[Receiver Service] Server is running on http://localhost:${PORT}`);
});
