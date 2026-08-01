/**
 * Service to manage WebSocket connections and broadcasting
 */
class WebSocketService {
  /**
   * Initializes the WebSocketService
   */
  constructor() {
    this.clients = new Set();
  }

  /**
   * Handles a new WebSocket connection
   * @param {import('ws').WebSocket} ws
   */
  handleConnection(ws) {
    this.clients.add(ws);
    ws.isAlive = true;

    ws.on('pong', () => {
      ws.isAlive = true;
    });

    ws.on('close', () => {
      this.clients.delete(ws);
    });

    // Send welcome message
    this.sendToClient(ws, 'welcome', { message: 'Connected to Student Management WebSocket' });
  }

  /**
   * Broadcasts an event to all connected clients
   * @param {string} event - The event name (e.g. 'student:created')
   * @param {Object} data - The payload
   */
  broadcast(event, data) {
    const message = JSON.stringify({ event, data, timestamp: new Date().toISOString() });
    for (const client of this.clients) {
      if (client.readyState === 1 /* ws.OPEN */) {
        client.send(message);
      }
    }
  }

  /**
   * Sends an event to a specific client
   * @param {import('ws').WebSocket} ws
   * @param {string} event
   * @param {Object} data
   */
  sendToClient(ws, event, data) {
    if (ws.readyState === 1 /* ws.OPEN */) {
      ws.send(JSON.stringify({ event, data, timestamp: new Date().toISOString() }));
    }
  }

  /**
   * Returns the number of connected clients
   * @returns {number}
   */
  getConnectedCount() {
    return this.clients.size;
  }
}

// Export as singleton
export default new WebSocketService();
