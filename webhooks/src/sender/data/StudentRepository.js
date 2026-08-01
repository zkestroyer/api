import Student from '../models/Student.js';

/**
 * Singleton repository for managing Student data in-memory.
 */
class StudentRepository {
  /**
   * Initializes the repository with seed data.
   */
  constructor() {
    /** @type {Map<string, Student>} */
    this.students = new Map();
    this._seed();
  }

  /**
   * Seeds the repository with initial student data.
   * @private
   */
  _seed() {
    const seedData = [
      { name: 'Ahmed Ali', email: 'ahmed.ali@university.edu', course: 'Computer Science', year: 3, gpa: 3.7 },
      { name: 'Sara Hassan', email: 'sara.hassan@university.edu', course: 'Software Engineering', year: 2, gpa: 3.9 },
      { name: 'Omar Farooq', email: 'omar.farooq@university.edu', course: 'Information Technology', year: 4, gpa: 3.5 }
    ];

    seedData.forEach(data => {
      const student = new Student(data);
      this.students.set(student.id, student);
    });
  }

  /**
   * Retrieves all students.
   * @returns {Student[]} Array of students.
   */
  findAll() {
    return Array.from(this.students.values());
  }

  /**
   * Retrieves a student by ID.
   * @param {string} id - The student's ID.
   * @returns {Student|null} The student, or null if not found.
   */
  findById(id) {
    return this.students.get(id) || null;
  }

  /**
   * Saves a new student or updates an existing one.
   * @param {Student} student - The student to save.
   * @returns {Student} The saved student.
   */
  save(student) {
    this.students.set(student.id, student);
    return student;
  }

  /**
   * Deletes a student by ID.
   * @param {string} id - The student's ID.
   * @returns {boolean} True if deleted, false if not found.
   */
  delete(id) {
    return this.students.delete(id);
  }
}

// Export singleton instance
const instance = new StudentRepository();
export default instance;
