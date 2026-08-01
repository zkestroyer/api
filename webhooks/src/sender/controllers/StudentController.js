import studentService from '../services/StudentService.js';
import webhookService from '../services/WebhookService.js';

/**
 * Controller for Student endpoints.
 */
class StudentController {
  /**
   * Retrieves all students.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getAll(req, res) {
    try {
      const students = studentService.getAllStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieves a student by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getById(req, res) {
    try {
      const student = studentService.getStudentById(req.params.id);
      res.json(student);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  /**
   * Creates a new student and triggers webhook.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  create(req, res) {
    try {
      const student = studentService.createStudent(req.body);
      webhookService.dispatch('student.created', student);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Updates an existing student and triggers webhook.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  update(req, res) {
    try {
      const student = studentService.updateStudent(req.params.id, req.body);
      webhookService.dispatch('student.updated', student);
      res.json(student);
    } catch (error) {
      res.status(error.status || 400).json({ error: error.message });
    }
  }

  /**
   * Deletes a student and triggers webhook.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  delete(req, res) {
    try {
      const student = studentService.deleteStudent(req.params.id);
      webhookService.dispatch('student.deleted', student);
      res.json({ message: 'Student deleted successfully', student });
    } catch (error) {
      res.status(error.status || 400).json({ error: error.message });
    }
  }
}

export default new StudentController();
