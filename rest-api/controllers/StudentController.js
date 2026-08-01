import studentService from '../services/StudentService.js';

/**
 * Controller class for handling HTTP requests for students.
 */
class StudentController {
  /**
   * Handle GET /api/students
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {import('express').NextFunction} next - Express next middleware function
   */
  static async getAllStudents(req, res, next) {
    try {
      const students = studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handle GET /api/students/:id
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {import('express').NextFunction} next - Express next middleware function
   */
  static async getStudentById(req, res, next) {
    try {
      const { id } = req.params;
      const student = studentService.getStudentById(id);
      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handle POST /api/students
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {import('express').NextFunction} next - Express next middleware function
   */
  static async createStudent(req, res, next) {
    try {
      const student = studentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handle PUT /api/students/:id
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {import('express').NextFunction} next - Express next middleware function
   */
  static async updateStudent(req, res, next) {
    try {
      const { id } = req.params;
      const updatedStudent = studentService.updateStudent(id, req.body);
      res.status(200).json(updatedStudent);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handle DELETE /api/students/:id
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {import('express').NextFunction} next - Express next middleware function
   */
  static async deleteStudent(req, res, next) {
    try {
      const { id } = req.params;
      studentService.deleteStudent(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default StudentController;
