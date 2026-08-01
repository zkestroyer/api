import Student from '../models/Student.js';

/**
 * Singleton repository class for managing in-memory student data.
 */
class StudentRepository {
  /**
   * Initializes the repository with seed data.
   */
  constructor() {
    /**
     * @type {Map<string, Student>}
     */
    this.students = new Map();
    this.seed();
  }

  /**
   * Populates the repository with initial data.
   * @private
   */
  seed() {
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
   * @returns {Student[]} Array of all students
   */
  findAll() {
    return Array.from(this.students.values());
  }

  /**
   * Retrieves a student by their ID.
   * @param {string} id - The student's ID
   * @returns {Student|null} The student if found, otherwise null
   */
  findById(id) {
    return this.students.get(id) || null;
  }

  /**
   * Adds a new student to the repository.
   * @param {Student} student - The student to add
   * @returns {Student} The added student
   */
  create(student) {
    this.students.set(student.id, student);
    return student;
  }

  /**
   * Updates an existing student.
   * @param {string} id - The ID of the student to update
   * @param {Object} updateData - Data to update
   * @returns {Student|null} The updated student, or null if not found
   */
  update(id, updateData) {
    const student = this.findById(id);
    if (!student) return null;

    Object.assign(student, updateData);
    this.students.set(id, student);
    return student;
  }

  /**
   * Deletes a student by their ID.
   * @param {string} id - The ID of the student to delete
   * @returns {boolean} True if deleted, false if not found
   */
  delete(id) {
    return this.students.delete(id);
  }
}

// Export as a singleton
export default new StudentRepository();
