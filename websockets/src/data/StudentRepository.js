import Student from '../models/Student.js';

/**
 * In-memory repository for Student data
 */
class StudentRepository {
  /**
   * Initializes the repository with seed data
   */
  constructor() {
    this.students = new Map();
    this.seed();
  }

  /**
   * Pre-populates 3 sample students
   */
  seed() {
    const students = [
      { name: "Ahmed Ali", email: "ahmed.ali@university.edu", course: "Computer Science", year: 3, gpa: 3.7 },
      { name: "Sara Hassan", email: "sara.hassan@university.edu", course: "Software Engineering", year: 2, gpa: 3.9 },
      { name: "Omar Farooq", email: "omar.farooq@university.edu", course: "Information Technology", year: 4, gpa: 3.5 }
    ];

    students.forEach(data => {
      const student = new Student(data);
      this.students.set(student.id, student);
    });
  }

  /**
   * Gets all students
   * @returns {Student[]}
   */
  findAll() {
    return Array.from(this.students.values());
  }

  /**
   * Gets a student by ID
   * @param {string} id
   * @returns {Student|undefined}
   */
  findById(id) {
    return this.students.get(id);
  }

  /**
   * Creates a new student
   * @param {Student} student
   * @returns {Student}
   */
  create(student) {
    this.students.set(student.id, student);
    return student;
  }

  /**
   * Updates an existing student
   * @param {string} id
   * @param {Object} data
   * @returns {Student|null}
   */
  update(id, data) {
    const student = this.students.get(id);
    if (!student) return null;

    Object.assign(student, data);
    this.students.set(id, student);
    return student;
  }

  /**
   * Deletes a student
   * @param {string} id
   * @returns {boolean}
   */
  delete(id) {
    return this.students.delete(id);
  }
}

// Export as singleton
export default new StudentRepository();
