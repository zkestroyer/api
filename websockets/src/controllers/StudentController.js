import studentService from '../services/StudentService.js';
import wsService from '../services/WebSocketService.js';

/**
 * Controller for handling Student REST requests
 */
class StudentController {
  /**
   * Get all students
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getAll(req, res) {
    try {
      const students = studentService.getAllStudents();
      res.json(students);
      wsService.broadcast('student:list', { count: students.length });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a single student by ID
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getById(req, res) {
    try {
      const student = studentService.getStudentById(req.params.id);
      res.json(student);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  /**
   * Create a new student
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  create(req, res) {
    try {
      const student = studentService.createStudent(req.body);
      res.status(201).json(student);
      wsService.broadcast('student:created', student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Update an existing student
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  update(req, res) {
    try {
      const student = studentService.updateStudent(req.params.id, req.body);
      res.json(student);
      wsService.broadcast('student:updated', student);
    } catch (error) {
      res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  /**
   * Delete a student
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  delete(req, res) {
    try {
      studentService.deleteStudent(req.params.id);
      res.status(204).send();
      wsService.broadcast('student:deleted', { id: req.params.id });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

export default new StudentController();
