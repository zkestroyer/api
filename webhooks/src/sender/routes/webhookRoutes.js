import { Router } from 'express';
import webhookController from '../controllers/WebhookController.js';

const router = Router();

router.post('/register', webhookController.register.bind(webhookController));
router.delete('/unregister', webhookController.unregister.bind(webhookController));

export default router;
