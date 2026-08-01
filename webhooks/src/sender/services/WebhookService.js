import axios from 'axios';
import crypto from 'crypto';

/**
 * Service for managing and dispatching webhooks.
 */
class WebhookService {
  constructor() {
    /** @type {Map<string, string[]>} */
    this.registry = new Map(); // URL -> Array of events
    this.secret = 'webhook-secret-key-2026';
  }

  /**
   * Registers a webhook URL for specific events.
   * @param {string} url - The webhook URL.
   * @param {string[]} events - Array of events to subscribe to.
   */
  registerWebhook(url, events) {
    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      throw new Error('Valid URL is required');
    }
    if (!Array.isArray(events) || events.length === 0) {
      throw new Error('At least one event must be specified');
    }
    this.registry.set(url, events);
    console.log(`[WebhookService] Registered ${url} for events: ${events.join(', ')}`);
  }

  /**
   * Unregisters a webhook URL.
   * @param {string} url - The webhook URL.
   * @returns {boolean} True if removed, false otherwise.
   */
  unregisterWebhook(url) {
    const removed = this.registry.delete(url);
    if (removed) {
      console.log(`[WebhookService] Unregistered ${url}`);
    }
    return removed;
  }

  /**
   * Dispatches an event to all subscribed webhooks.
   * @param {string} event - The event name (e.g., student.created).
   * @param {Object} payloadData - The event payload.
   */
  dispatch(event, payloadData) {
    const payload = {
      event,
      timestamp: new Date().toISOString(),
      data: payloadData
    };

    const payloadString = JSON.stringify(payload);
    const signature = this._generateSignature(payloadString);

    for (const [url, subscribedEvents] of this.registry.entries()) {
      if (subscribedEvents.includes(event) || subscribedEvents.includes('*')) {
        this._sendWithRetry(url, payloadString, signature, 1);
      }
    }
  }

  /**
   * Generates HMAC-SHA256 signature.
   * @param {string} payloadString - The stringified payload.
   * @returns {string} The signature.
   * @private
   */
  _generateSignature(payloadString) {
    return crypto
      .createHmac('sha256', this.secret)
      .update(payloadString)
      .digest('hex');
  }

  /**
   * Sends payload with retry logic.
   * @param {string} url - The target URL.
   * @param {string} payloadString - The payload.
   * @param {string} signature - The signature.
   * @param {number} attempt - Current attempt number.
   * @private
   */
  async _sendWithRetry(url, payloadString, signature, attempt) {
    const maxAttempts = 3;
    try {
      await axios.post(url, payloadString, {
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature
        },
        timeout: 5000
      });
      console.log(`[WebhookService] Successfully dispatched to ${url} (Attempt ${attempt})`);
    } catch (error) {
      console.error(`[WebhookService] Failed to dispatch to ${url} (Attempt ${attempt}): ${error.message}`);
      if (attempt < maxAttempts) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`[WebhookService] Retrying ${url} in ${delay}ms...`);
        setTimeout(() => this._sendWithRetry(url, payloadString, signature, attempt + 1), delay);
      } else {
        console.error(`[WebhookService] Max retries reached for ${url}. Dropping event.`);
      }
    }
  }
}

export default new WebhookService();
