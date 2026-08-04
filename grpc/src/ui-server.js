import express from 'express';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
import util from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, 'proto', 'student.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const studentPackage = protoDescriptor.student;

// Initialize gRPC Client
const client = new studentPackage.StudentService('localhost:50051', grpc.credentials.createInsecure());

// Promisify client methods
const getStudents = util.promisify(client.GetStudents).bind(client);
const createStudent = util.promisify(client.CreateStudent).bind(client);
const deleteStudent = util.promisify(client.DeleteStudent).bind(client);

// Express setup
const app = express();
const port = 3007; // Different port for UI

app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// REST Bridge endpoints for Frontend UI -> gRPC
app.get('/api/bridge/students', async (req, res) => {
  try {
    const result = await getStudents({});
    res.json({ students: result.students || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bridge/students', async (req, res) => {
  try {
    const result = await createStudent(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/bridge/students/:id', async (req, res) => {
  try {
    const result = await deleteStudent({ id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`gRPC UI server started at http://localhost:${port}`);
  console.log('NOTE: Ensure the gRPC server is running on port 50051 first!');
});
