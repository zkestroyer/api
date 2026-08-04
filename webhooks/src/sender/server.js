import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import studentRoutes from './routes/studentRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3004;

app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../../public_sender')));

app.use('/api/students', studentRoutes);
app.use('/api/webhooks', webhookRoutes);

app.listen(PORT, () => {
  console.log(`[Sender Service] Server is running on http://localhost:${PORT}`);
});
