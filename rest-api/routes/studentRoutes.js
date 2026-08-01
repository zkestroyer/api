import { Router } from 'express';
import StudentController from '../controllers/StudentController.js';

const router = Router();

// GET all students
router.get('/', StudentController.getAllStudents);

// GET student by ID
router.get('/:id', StudentController.getStudentById);

// POST create new student
router.post('/', StudentController.createStudent);

// PUT update existing student
router.put('/:id', StudentController.updateStudent);

// DELETE student
router.delete('/:id', StudentController.deleteStudent);

export default router;
