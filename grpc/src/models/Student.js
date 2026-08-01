import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a Student entity in the system.
 */
export default class Student {
  /**
   * Create a Student.
   * @param {Object} param0 - The student details.
   * @param {string} [param0.id] - The unique identifier.
   * @param {string} param0.name - The full name.
   * @param {string} param0.email - The email address.
   * @param {string} param0.course - The enrolled course.
   * @param {number} param0.year - The year of study.
   * @param {number} param0.gpa - The current GPA.
   */
  constructor({ id, name, email, course, year, gpa }) {
    this.id = id || uuidv4();
    this.name = name;
    this.email = email;
    this.course = course;
    this.year = year;
    this.gpa = gpa;
  }

  /**
   * Validates the student properties.
   * @throws {Error} If validation fails.
   */
  validate() {
    if (!this.name || typeof this.name !== 'string') {
      throw new Error('Name is required and must be a string.');
    }
    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new Error('A valid email is required.');
    }
    if (!this.course || typeof this.course !== 'string') {
      throw new Error('Course is required and must be a string.');
    }
    if (typeof this.year !== 'number' || this.year < 1 || this.year > 5) {
      throw new Error('Year must be a number between 1 and 5.');
    }
    if (typeof this.gpa !== 'number' || this.gpa < 0 || this.gpa > 4.0) {
      throw new Error('GPA must be a number between 0 and 4.0.');
    }
  }

  /**
   * Returns a plain object representation of the student.
   * @returns {Object} Plain object.
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      course: this.course,
      year: this.year,
      gpa: this.gpa
    };
  }

  /**
   * Creates a Student instance from a plain object.
   * @param {Object} obj - The object to instantiate from.
   * @returns {Student} The created Student.
   */
  static fromObject(obj) {
    return new Student(obj);
  }
}
