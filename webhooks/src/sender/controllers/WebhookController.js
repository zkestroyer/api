import webhookService from '../services/WebhookService.js';

/**
 * Controller for Webhook registration endpoints.
 */
class WebhookController {
  /**
   * Registers a new webhook.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  register(req, res) {
    try {
      const { url, events } = req.body;
      webhookService.registerWebhook(url, events);
      res.status(201).json({ message: 'Webhook registered successfully', url, events });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Unregisters a webhook.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  unregister(req, res) {
    try {
      const { url } = req.body;
      const success = webhookService.unregisterWebhook(url);
      if (success) {
        res.json({ message: 'Webhook unregistered successfully' });
      } else {
        res.status(404).json({ error: 'Webhook URL not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new WebhookController();
