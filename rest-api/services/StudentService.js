import studentRepository from '../data/StudentRepository.js';
import Student from '../models/Student.js';

/**
 * Service class for handling student business logic.
 */
class StudentService {
  /**
   * Retrieves all students.
   * @returns {Array<Object>} List of all students as plain objects
   */
  getAllStudents() {
    return studentRepository.findAll().map(s => s.toJSON());
  }

  /**
   * Retrieves a specific student by ID.
   * @param {string} id - The student UUID
   * @returns {Object} The student as a plain object
   * @throws {Error} If student is not found
   */
  getStudentById(id) {
    const student = studentRepository.findById(id);
    if (!student) {
      const error = new Error(`Student with ID ${id} not found`);
      error.statusCode = 404;
      throw error;
    }
    return student.toJSON();
  }

  /**
   * Creates a new student.
   * @param {Object} data - The student data
   * @returns {Object} The created student as a plain object
   * @throws {Error} If validation fails
   */
  createStudent(data) {
    const student = Student.fromObject(data);
    
    try {
      student.validate();
    } catch (err) {
      const error = new Error(`Validation Error: ${err.message}`);
      error.statusCode = 400;
      throw error;
    }

    const createdStudent = studentRepository.create(student);
    return createdStudent.toJSON();
  }

  /**
   * Updates an existing student.
   * @param {string} id - The student UUID
   * @param {Object} data - Data to update
   * @returns {Object} The updated student as a plain object
   * @throws {Error} If student not found or validation fails
   */
  updateStudent(id, data) {
    // Check if exists
    this.getStudentById(id); // Will throw 404 if not found
    
    // Create temp student to validate new merged state
    const existingStudent = studentRepository.findById(id);
    const tempStudent = new Student({ ...existingStudent.toJSON(), ...data, id });
    
    try {
      tempStudent.validate();
    } catch (err) {
      const error = new Error(`Validation Error: ${err.message}`);
      error.statusCode = 400;
      throw error;
    }

    const updatedStudent = studentRepository.update(id, data);
    return updatedStudent.toJSON();
  }

  /**
   * Deletes a student.
   * @param {string} id - The student UUID
   * @throws {Error} If student not found
   */
  deleteStudent(id) {
    const deleted = studentRepository.delete(id);
    if (!deleted) {
      const error = new Error(`Student with ID ${id} not found`);
      error.statusCode = 404;
      throw error;
    }
  }
}

export default new StudentService();
