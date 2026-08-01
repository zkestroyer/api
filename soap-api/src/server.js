import express from 'express';
import { listen } from 'soap';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import StudentSoapService from './services/StudentSoapService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3002;

app.use(express.json());

const wsdlPath = path.join(__dirname, 'wsdl', 'student.wsdl');
const wsdl = readFileSync(wsdlPath, 'utf8');

const service = StudentSoapService.getService();

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
  listen(app, '/wsdl', service, wsdl);
  console.log(`SOAP API initialized at http://localhost:${port}/wsdl`);
});
