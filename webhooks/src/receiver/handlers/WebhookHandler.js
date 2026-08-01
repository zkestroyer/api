import signatureVerifier from '../services/SignatureVerifier.js';

/**
 * Handler for incoming webhook events.
 */
class WebhookHandler {
  constructor() {
    /** @type {Object[]} */
    this.eventHistory = [];
  }

  /**
   * Processes the incoming webhook request.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  handleEvent(req, res) {
    const signature = req.headers['x-webhook-signature'];
    
    // We need the raw body as a string to verify the signature properly
    // This assumes body-parser is configured to provide raw body
    const payloadString = JSON.stringify(req.body);

    if (!signatureVerifier.verify(payloadString, signature)) {
      console.warn('[Receiver Service] Invalid webhook signature detected');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = req.body;
    console.log(`[Receiver Service] Received event: ${event.event} at ${event.timestamp}`);
    console.log(`[Receiver Service] Payload data:`, event.data);

    this.eventHistory.push(event);

    res.status(200).json({ message: 'Event received successfully' });
  }

  /**
   * Retrieves the history of received events.
   * @returns {Object[]} The event history.
   */
  getHistory() {
    return this.eventHistory;
  }
}

export default new WebhookHandler();
