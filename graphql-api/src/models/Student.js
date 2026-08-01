import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a Student in the system.
 */
export default class Student {
  /**
   * Creates a new Student instance.
   * @param {Object} param0 - Student data
   * @param {string} [param0.id] - The unique identifier (auto-generated if not provided)
   * @param {string} param0.name - The student's full name
   * @param {string} param0.email - The student's email address
   * @param {string} param0.course - The student's enrolled course
   * @param {number} param0.year - The student's academic year
   * @param {number} param0.gpa - The student's Grade Point Average
   */
  constructor({ id = uuidv4(), name, email, course, year, gpa }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.course = course;
    this.year = year;
    this.gpa = gpa;
  }

  /**
   * Validates the student data.
   * @throws {Error} If any validation rule fails
   */
  validate() {
    if (!this.name || typeof this.name !== 'string') {
      throw new Error('Name must be a non-empty string');
    }
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Invalid email address');
    }
    if (!this.course || typeof this.course !== 'string') {
      throw new Error('Course must be a non-empty string');
    }
    if (typeof this.year !== 'number' || this.year < 1) {
      throw new Error('Year must be a positive integer');
    }
    if (typeof this.gpa !== 'number' || this.gpa < 0.0 || this.gpa > 4.0) {
      throw new Error('GPA must be a number between 0.0 and 4.0');
    }
  }

  /**
   * Converts the Student instance to a plain JSON object.
   * @returns {Object} Plain object representation of the student
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
   * @param {Object} obj - The plain object
   * @returns {Student} The instantiated Student object
   */
  static fromObject(obj) {
    return new Student(obj);
  }
}
