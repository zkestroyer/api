const API_URL = '/api/bridge/students';

// DOM Elements
const tbody = document.getElementById('student-table-body');
const totalStudentsEl = document.getElementById('total-students');
const lastActionEl = document.getElementById('last-action');
const eventLog = document.getElementById('event-log');
const modal = document.getElementById('add-modal');
const form = document.getElementById('add-student-form');

// Initialize
document.addEventListener('DOMContentLoaded', fetchStudents);

// Fetch all students
async function fetchStudents() {
    logEvent('GET', 'Fetching via gRPC Bridge...');
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (response.ok) {
            const students = data.students || [];
            logEvent('SUCCESS', `Fetched ${students.length} students via gRPC`);
            renderTable(students);
            totalStudentsEl.textContent = students.length;
            updateLastAction('Refreshed database');
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        logEvent('ERROR', error.message);
        console.error(error);
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

    logEvent('POST', `Adding student via gRPC Bridge...`);
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            logEvent('SUCCESS', `Added student via gRPC (ID: ${data.id.substring(0, 8)}...)`);
            updateLastAction('Added ' + newStudent.name);
            closeAddModal();
            form.reset();
            fetchStudents(); // Refresh table
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        logEvent('ERROR', error.message);
        alert('Failed to add student: ' + error.message);
    }
});

// Delete student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    logEvent('DELETE', `Deleting student via gRPC Bridge...`);
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            logEvent('SUCCESS', 'Student deleted via gRPC');
            updateLastAction('Deleted student');
            fetchStudents();
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch (error) {
        logEvent('ERROR', error.message);
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
function logEvent(method, message) {
    const time = new Date().toLocaleTimeString();
    const colorClass = method === 'ERROR' ? 'log-error' : (method === 'SUCCESS' ? 'log-success' : 'log-method');
    
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
