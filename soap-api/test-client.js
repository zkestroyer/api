import { createClientAsync } from 'soap';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const wsdlPath = path.join(__dirname, 'src', 'wsdl', 'student.wsdl');

async function run() {
  console.log("Creating client from:", wsdlPath);
  try {
    const client = await createClientAsync(wsdlPath);
    console.log("Client created successfully!");
    
    client.setEndpoint('http://localhost:3002/wsdl');
    console.log("Endpoint set. Fetching students...");
    
    const [result] = await client.GetStudentsAsync({});
    console.log("Result:", result);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
