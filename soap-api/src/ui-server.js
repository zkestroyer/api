import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import StudentSoapService from './services/StudentSoapService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const soapPort = 3002;
const bridgePort = 3008;

const bridgeApp = express();
bridgeApp.use(express.json());
bridgeApp.use(express.static(path.join(__dirname, '../public')));

const service = StudentSoapService.getService().StudentManagementService.StudentManagementPort;

bridgeApp.get('/api/bridge/students', (req, res) => {
  try {
    const result = service.GetStudents({});
    const students = result.students || [];
    res.json({ students: Array.isArray(students) ? students : [students] });
  } catch (err) {
    res.status(500).json({ error: err.Fault ? err.Fault.Reason.Text : err.message });
  }
});

bridgeApp.post('/api/bridge/students', (req, res) => {
  try {
    const result = service.AddStudent({ student: req.body });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.Fault ? err.Fault.Reason.Text : err.message });
  }
});

bridgeApp.delete('/api/bridge/students/:id', (req, res) => {
  try {
    const result = service.DeleteStudent({ id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.Fault ? err.Fault.Reason.Text : err.message });
  }
});

bridgeApp.listen(bridgePort, () => {
  console.log(`SOAP UI Bridge running on port ${bridgePort}`);
});
