import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

const app = express();
const PORT = 3004;

app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/webhooks', webhookRoutes);

app.listen(PORT, () => {
  console.log(`[Sender Service] Server is running on http://localhost:${PORT}`);
});
