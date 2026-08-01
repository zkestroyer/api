import crypto from 'crypto';

/**
 * Service to verify HMAC signatures for incoming webhooks.
 */
class SignatureVerifier {
  constructor() {
    this.secret = 'webhook-secret-key-2026';
  }

  /**
   * Verifies the given signature against the payload string.
   * @param {string} payloadString - The raw stringified payload.
   * @param {string} signature - The signature to verify.
   * @returns {boolean} True if signature is valid, false otherwise.
   */
  verify(payloadString, signature) {
    if (!signature) return false;

    const expectedSignature = crypto
      .createHmac('sha256', this.secret)
      .update(payloadString)
      .digest('hex');

    try {
      return crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(signature)
      );
    } catch (error) {
      return false; // Typically length mismatch
    }
  }
}

export default new SignatureVerifier();
