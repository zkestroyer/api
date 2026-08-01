import repository from '../data/StudentRepository.js';
import Student from '../models/Student.js';

/**
 * Service class for Student business logic
 */
class StudentService {
  /**
   * Retrieves all students
   * @returns {Object[]}
   */
  getAllStudents() {
    return repository.findAll().map(s => s.toJSON());
  }

  /**
   * Retrieves a student by ID
   * @param {string} id
   * @returns {Object}
   * @throws {Error} if student not found
   */
  getStudentById(id) {
    const student = repository.findById(id);
    if (!student) {
      const error = new Error('Student not found');
      error.statusCode = 404;
      throw error;
    }
    return student.toJSON();
  }

  /**
   * Creates a new student
   * @param {Object} data
   * @returns {Object}
   */
  createStudent(data) {
    const student = new Student(data);
    student.validate();
    const created = repository.create(student);
    return created.toJSON();
  }

  /**
   * Updates a student
   * @param {string} id
   * @param {Object} data
   * @returns {Object}
   * @throws {Error} if student not found
   */
  updateStudent(id, data) {
    // Validate by creating a temporary object
    const temp = new Student({ ...this.getStudentById(id), ...data, id });
    temp.validate();

    const updated = repository.update(id, temp.toJSON());
    if (!updated) {
      const error = new Error('Student not found');
      error.statusCode = 404;
      throw error;
    }
    return updated.toJSON();
  }

  /**
   * Deletes a student
   * @param {string} id
   * @throws {Error} if student not found
   */
  deleteStudent(id) {
    const deleted = repository.delete(id);
    if (!deleted) {
      const error = new Error('Student not found');
      error.statusCode = 404;
      throw error;
    }
  }
}

export default new StudentService();
