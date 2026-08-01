import Student from '../models/Student.js';

/**
 * In-memory repository for students.
 * Follows the Singleton pattern.
 */
class StudentRepository {
  /**
   * Initializes the repository with seed data.
   */
  constructor() {
    this.students = new Map();
    this.seed();
  }

  /**
   * Seeds the in-memory map with initial student data.
   */
  seed() {
    const seedData = [
      { name: "Ahmed Ali", email: "ahmed.ali@university.edu", course: "Computer Science", year: 3, gpa: 3.7 },
      { name: "Sara Hassan", email: "sara.hassan@university.edu", course: "Software Engineering", year: 2, gpa: 3.9 },
      { name: "Omar Farooq", email: "omar.farooq@university.edu", course: "Information Technology", year: 4, gpa: 3.5 }
    ];

    for (const data of seedData) {
      const student = new Student(data);
      this.students.set(student.id, student);
    }
  }

  /**
   * Retrieves all students.
   * @returns {Array<Student>} An array of all students.
   */
  findAll() {
    return Array.from(this.students.values());
  }

  /**
   * Retrieves a student by ID.
   * @param {string} id - The student's ID.
   * @returns {Student|null} The student or null if not found.
   */
  findById(id) {
    return this.students.get(id) || null;
  }

  /**
   * Creates and saves a new student.
   * @param {Student} student - The student to save.
   * @returns {Student} The saved student.
   */
  create(student) {
    this.students.set(student.id, student);
    return student;
  }

  /**
   * Updates an existing student.
   * @param {string} id - The student ID to update.
   * @param {Object} data - The data to update.
   * @returns {Student|null} The updated student or null if not found.
   */
  update(id, data) {
    const student = this.findById(id);
    if (!student) return null;

    if (data.name !== undefined) student.name = data.name;
    if (data.email !== undefined) student.email = data.email;
    if (data.course !== undefined) student.course = data.course;
    if (data.year !== undefined) student.year = data.year;
    if (data.gpa !== undefined) student.gpa = data.gpa;

    this.students.set(id, student);
    return student;
  }

  /**
   * Deletes a student by ID.
   * @param {string} id - The student ID.
   * @returns {boolean} True if deleted, false if not found.
   */
  delete(id) {
    return this.students.delete(id);
  }
}

// Export as singleton
const repository = new StudentRepository();
export default repository;
