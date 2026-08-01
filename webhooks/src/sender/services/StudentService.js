import studentRepository from '../data/StudentRepository.js';
import Student from '../models/Student.js';

/**
 * Service for handling Student business logic.
 */
class StudentService {
  /**
   * Retrieves all students.
   * @returns {Object[]} Array of student data.
   */
  getAllStudents() {
    return studentRepository.findAll().map(s => s.toJSON());
  }

  /**
   * Retrieves a student by ID.
   * @param {string} id - The student ID.
   * @returns {Object} The student data.
   * @throws {Error} If student not found.
   */
  getStudentById(id) {
    const student = studentRepository.findById(id);
    if (!student) {
      const error = new Error('Student not found');
      error.status = 404;
      throw error;
    }
    return student.toJSON();
  }

  /**
   * Creates a new student.
   * @param {Object} data - The student data.
   * @returns {Object} The created student data.
   */
  createStudent(data) {
    const student = new Student(data);
    student.validate();
    studentRepository.save(student);
    return student.toJSON();
  }

  /**
   * Updates an existing student.
   * @param {string} id - The student ID.
   * @param {Object} data - The updated data.
   * @returns {Object} The updated student data.
   * @throws {Error} If student not found.
   */
  updateStudent(id, data) {
    const existingStudent = studentRepository.findById(id);
    if (!existingStudent) {
      const error = new Error('Student not found');
      error.status = 404;
      throw error;
    }

    const updatedStudent = new Student({ ...existingStudent.toJSON(), ...data, id });
    updatedStudent.validate();
    studentRepository.save(updatedStudent);
    return updatedStudent.toJSON();
  }

  /**
   * Deletes a student.
   * @param {string} id - The student ID.
   * @returns {Object} The deleted student data.
   * @throws {Error} If student not found.
   */
  deleteStudent(id) {
    const student = studentRepository.findById(id);
    if (!student) {
      const error = new Error('Student not found');
      error.status = 404;
      throw error;
    }
    studentRepository.delete(id);
    return student.toJSON();
  }
}

export default new StudentService();
