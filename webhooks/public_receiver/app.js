const eventLog = document.getElementById('event-log');
const totalEventsEl = document.getElementById('total-events');
let eventCount = 0;

// Setup Server-Sent Events (SSE) connection
const eventSource = new EventSource('/webhooks/stream');

eventSource.onmessage = (event) => {
    if (eventCount === 0) {
        eventLog.innerHTML = ''; // clear waiting message
    }
    
    eventCount++;
    totalEventsEl.textContent = eventCount;
    
    const payload = JSON.parse(event.data);
    logWebhook(payload);
};

eventSource.onerror = (error) => {
    console.error("SSE Error:", error);
};

function logWebhook(payload) {
    const time = new Date(payload.timestamp).toLocaleTimeString();
    
    let colorClass = 'log-success';
    if (payload.event === 'student.deleted') colorClass = 'log-error';
    if (payload.event === 'student.updated') colorClass = 'log-method';
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.style.marginBottom = '16px';
    entry.style.padding = '12px';
    entry.style.background = 'rgba(255,255,255,0.05)';
    entry.style.borderRadius = '8px';
    
    let dataHtml = '';
    if (payload.data && Object.keys(payload.data).length > 0) {
        dataHtml = `<pre style="margin-top: 8px; color: #a78bfa; font-size: 0.85rem;">${JSON.stringify(payload.data, null, 2)}</pre>`;
    }

    entry.innerHTML = `
        <div style="display: flex; gap: 12px; font-weight: bold;">
            <span class="log-time">[${time}]</span>
            <span class="${colorClass}">${payload.event}</span>
            <span style="color: var(--text-muted)">ID: ${payload.id}</span>
        </div>
        ${dataHtml}
    `;
    
    eventLog.appendChild(entry);
    eventLog.scrollTop = eventLog.scrollHeight;
}
