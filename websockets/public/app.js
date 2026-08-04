const API_URL = '/api/students';

// DOM Elements
const tbody = document.getElementById('student-table-body');
const totalStudentsEl = document.getElementById('total-students');
const lastActionEl = document.getElementById('last-action');
const eventLog = document.getElementById('event-log');
const modal = document.getElementById('add-modal');
const form = document.getElementById('add-student-form');
const connectionStatus = document.getElementById('connection-status');

// WebSockets Setup
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(`${wsProtocol}//${window.location.host}`);

ws.onopen = () => {
    connectionStatus.textContent = `Connected to WS Port ${window.location.port}`;
    document.querySelector('.pulse').style.backgroundColor = '#10b981';
    logEvent('WS OPEN', 'WebSocket connection established');
};

ws.onclose = () => {
    connectionStatus.textContent = `Disconnected`;
    connectionStatus.style.color = '#ef4444';
    document.querySelector('.pulse').style.backgroundColor = '#ef4444';
    logEvent('WS CLOSE', 'WebSocket connection closed', 'error');
};

ws.onmessage = (event) => {
    const payload = JSON.parse(event.data);
    const time = new Date(payload.timestamp).toLocaleTimeString();
    
    logEvent('WS MSG', `[${payload.event}] received`);
    
    // Auto-refresh table when students are created, updated, or deleted
    if (['student:created', 'student:updated', 'student:deleted'].includes(payload.event)) {
        logEvent('UPDATE', 'Live data changed, refreshing table...');
        fetchStudents();
    }
};

ws.onerror = (error) => {
    logEvent('WS ERROR', 'WebSocket encountered an error', 'error');
};

// Initialize
document.addEventListener('DOMContentLoaded', fetchStudents);

// Fetch all students (REST fallback for initial load)
async function fetchStudents() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (response.ok) {
            const students = data || [];
            renderTable(students);
            totalStudentsEl.textContent = students.length;
            updateLastAction('Refreshed database');
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        logEvent('ERROR', error.message, 'error');
    }
}

// Add student
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newStudent = {
        name: document.getElementById('s-name').value,
        email: document.getElementById('s-email').value,
        course: document.getElementById('s-course').value,
        year: parseInt(document.getElementById('s-year').value),
        gpa: parseFloat(document.getElementById('s-gpa').value)
    };

    logEvent('POST', `Adding student via REST API...`);
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            logEvent('SUCCESS', `Added student (ID: ${data.id.substring(0, 8)}...)`);
            updateLastAction('Added ' + newStudent.name);
            closeAddModal();
            form.reset();
            // We don't need to manually fetchStudents() here because WS will tell us to!
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        logEvent('ERROR', error.message, 'error');
        alert('Failed to add student: ' + error.message);
    }
});

// Delete student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    logEvent('DELETE', `Deleting student via REST API...`);
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            logEvent('SUCCESS', 'Student deleted');
            updateLastAction('Deleted student');
            // We don't need to manually fetchStudents() here because WS will tell us to!
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch (error) {
        logEvent('ERROR', error.message, 'error');
    }
}

// Render table
function renderTable(students) {
    tbody.innerHTML = '';
    
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted)">No students found.</td></tr>';
        return;
    }

    students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${student.name}</strong><br><small style="color:var(--text-muted);font-size:0.8rem">${student.id}</small></td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td><span class="badge badge-year-${student.year}">Year ${student.year}</span></td>
            <td><strong>${parseFloat(student.gpa).toFixed(1)}</strong></td>
            <td>
                <button class="btn btn-danger" onclick="deleteStudent('${student.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Utilities
function logEvent(method, message, type = 'method') {
    const time = new Date().toLocaleTimeString();
    const colorClass = type === 'error' ? 'log-error' : (type === 'success' ? 'log-success' : 'log-method');
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
        <span class="log-time">[${time}]</span>
        <span class="${colorClass}">${method}</span>
        <span>${message}</span>
    `;
    
    eventLog.appendChild(entry);
    eventLog.scrollTop = eventLog.scrollHeight;
}

function updateLastAction(text) {
    lastActionEl.textContent = text;
}

function openAddModal() {
    modal.classList.add('active');
}

function closeAddModal() {
    modal.classList.remove('active');
}
