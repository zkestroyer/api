import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import webhookHandler from './handlers/WebhookHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3005;

// Keep track of SSE clients
let clients = [];

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../../public_receiver')));

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
    
    // Notify all connected SSE clients
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(event)}\n\n`));
    
    res.status(200).json({ message: 'Event received successfully' });
  });
});

app.get('/webhooks/history', (req, res) => {
  res.json(webhookHandler.getHistory());
});

// SSE Endpoint for Live Updates in the UI
app.get('/webhooks/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  clients.push(newClient);

  req.on('close', () => {
    clients = clients.filter(client => client.id !== clientId);
  });
});

app.listen(PORT, () => {
  console.log(`[Receiver Service] Server is running on http://localhost:${PORT}`);
});
