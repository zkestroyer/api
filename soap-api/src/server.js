import express from 'express';
import { listen } from 'soap';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import StudentSoapService from './services/StudentSoapService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const soapPort = 3002;

// ==========================================
// 1. SOAP SERVER
// ==========================================
const soapApp = express();
const wsdlPath = path.join(__dirname, 'wsdl', 'student.wsdl');
const wsdl = readFileSync(wsdlPath, 'utf8');
const service = StudentSoapService.getService();

const soapServer = soapApp.listen(soapPort, () => {
  console.log(`SOAP server started on port ${soapPort}`);
  listen(soapServer, '/wsdl', service, wsdl);
  console.log(`SOAP endpoint ready at http://localhost:${soapPort}/wsdl?wsdl`);
});
