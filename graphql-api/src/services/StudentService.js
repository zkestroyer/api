import studentRepository from '../data/StudentRepository.js';
import Student from '../models/Student.js';

/**
 * Service class handling student-related business logic.
 */
export default class StudentService {
  /**
   * Retrieves all students.
   * @returns {Student[]} List of students
   */
  static getAllStudents() {
    return studentRepository.findAll();
  }

  /**
   * Retrieves a specific student by ID.
   * @param {string} id - The student ID
   * @returns {Student} The student
   * @throws {Error} If student is not found
   */
  static getStudentById(id) {
    const student = studentRepository.findById(id);
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    return student;
  }

  /**
   * Creates a new student.
   * @param {Object} data - Student creation data
   * @returns {Student} The created student
   */
  static createStudent(data) {
    const newStudent = new Student(data);
    newStudent.validate();
    return studentRepository.create(newStudent);
  }

  /**
   * Updates an existing student.
   * @param {string} id - The student ID
   * @param {Object} data - Data to update
   * @returns {Student} The updated student
   * @throws {Error} If student is not found
   */
  static updateStudent(id, data) {
    const student = studentRepository.findById(id);
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    
    const mergedData = { ...student.toJSON(), ...data };
    const tempStudent = new Student(mergedData);
    tempStudent.validate();

    return studentRepository.update(id, data);
  }

  /**
   * Deletes a student.
   * @param {string} id - The student ID
   * @returns {boolean} Deletion status
   * @throws {Error} If student is not found
   */
  static deleteStudent(id) {
    const success = studentRepository.delete(id);
    if (!success) {
      throw new Error(`Student with ID ${id} not found`);
    }
    return success;
  }
}
