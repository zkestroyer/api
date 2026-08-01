import Student from '../models/Student.js';

/**
 * Repository for managing Student data in-memory.
 * @class StudentRepository
 */
class StudentRepository {
  /**
   * Initializes the repository with a Map and pre-seeds data.
   */
  constructor() {
    /** @type {Map<string, Student>} */
    this.students = new Map();
    this.seedData();
  }

  /**
   * Pre-seeds 3 sample students into the repository.
   */
  seedData() {
    const initialStudents = [
      { name: "Ahmed Ali", email: "ahmed.ali@university.edu", course: "Computer Science", year: 3, gpa: 3.7 },
      { name: "Sara Hassan", email: "sara.hassan@university.edu", course: "Software Engineering", year: 2, gpa: 3.9 },
      { name: "Omar Farooq", email: "omar.farooq@university.edu", course: "Information Technology", year: 4, gpa: 3.5 }
    ];

    initialStudents.forEach(data => {
      const student = Student.fromObject(data);
      this.students.set(student.id, student);
    });
  }

  /**
   * Retrieves all students.
   * @returns {Student[]} Array of all students
   */
  getAll() {
    return Array.from(this.students.values());
  }

  /**
   * Retrieves a student by their ID.
   * @param {string} id - The student's ID
   * @returns {Student|null} The student or null if not found
   */
  getById(id) {
    return this.students.get(id) || null;
  }

  /**
   * Adds a new student to the repository.
   * @param {Student} student - The student instance
   * @returns {Student} The added student
   */
  add(student) {
    this.students.set(student.id, student);
    return student;
  }

  /**
   * Updates an existing student.
   * @param {string} id - The ID of the student to update
   * @param {Object} data - The updated data
   * @returns {Student|null} The updated student or null if not found
   */
  update(id, data) {
    const existing = this.students.get(id);
    if (!existing) return null;
    
    const updated = new Student({ ...existing.toJSON(), ...data, id });
    updated.validate();
    this.students.set(id, updated);
    return updated;
  }

  /**
   * Deletes a student by ID.
   * @param {string} id - The ID of the student to delete
   * @returns {boolean} True if deleted, false if not found
   */
  delete(id) {
    return this.students.delete(id);
  }
}

// Export as singleton
export default new StudentRepository();
