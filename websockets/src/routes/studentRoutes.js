import express from 'express';
import studentController from '../controllers/StudentController.js';

const router = express.Router();

router.get('/', (req, res) => studentController.getAll(req, res));
router.get('/:id', (req, res) => studentController.getById(req, res));
router.post('/', (req, res) => studentController.create(req, res));
router.put('/:id', (req, res) => studentController.update(req, res));
router.delete('/:id', (req, res) => studentController.delete(req, res));

export default router;
