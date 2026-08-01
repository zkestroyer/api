import Student from '../models/Student.js';

/**
 * Singleton class for managing student data in memory.
 */
class StudentRepository {
  /**
   * Initialize the repository and seed data.
   */
  constructor() {
    if (StudentRepository.instance) {
      return StudentRepository.instance;
    }
    
    /** @type {Map<string, Student>} */
    this.students = new Map();
    this._seedData();
    
    StudentRepository.instance = this;
  }

  /**
   * Pre-seeds the repository with 3 students.
   * @private
   */
  _seedData() {
    const students = [
      new Student({ name: "Ahmed Ali", email: "ahmed.ali@university.edu", course: "Computer Science", year: 3, gpa: 3.7 }),
      new Student({ name: "Sara Hassan", email: "sara.hassan@university.edu", course: "Software Engineering", year: 2, gpa: 3.9 }),
      new Student({ name: "Omar Farooq", email: "omar.farooq@university.edu", course: "Information Technology", year: 4, gpa: 3.5 })
    ];

    students.forEach(student => {
      this.students.set(student.id, student);
    });
  }

  /**
   * Retrieves all students.
   * @returns {Array<Student>} Array of all students
   */
  findAll() {
    return Array.from(this.students.values());
  }

  /**
   * Retrieves a student by their ID.
   * @param {string} id - The student's ID
   * @returns {Student|undefined} The student if found, otherwise undefined
   */
  findById(id) {
    return this.students.get(id);
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
   * Updates an existing student's data.
   * @param {string} id - The ID of the student to update
   * @param {Object} data - The new data to merge
   * @returns {Student|null} The updated student, or null if not found
   */
  update(id, data) {
    const existingStudent = this.students.get(id);
    if (!existingStudent) return null;
    
    const updatedStudent = new Student({ ...existingStudent.toJSON(), ...data, id });
    this.students.set(id, updatedStudent);
    return updatedStudent;
  }

  /**
   * Deletes a student from the repository.
   * @param {string} id - The ID of the student to delete
   * @returns {boolean} True if deleted, false if not found
   */
  delete(id) {
    return this.students.delete(id);
  }
}

// Export a single instance for singleton behavior
export default new StudentRepository();
