import { v4 as uuidv4 } from 'uuid';

/**
 * Student model class
 */
export default class Student {
  /**
   * Creates a new Student instance
   * @param {Object} data
   * @param {string} [data.id]
   * @param {string} data.name
   * @param {string} data.email
   * @param {string} data.course
   * @param {number} data.year
   * @param {number} data.gpa
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
   * Validates the student data
   * @throws {Error} if validation fails
   */
  validate() {
    if (!this.name) throw new Error('Name is required');
    if (!this.email || !this.email.includes('@')) throw new Error('Valid email is required');
    if (!this.course) throw new Error('Course is required');
    if (typeof this.year !== 'number' || this.year < 1) throw new Error('Year must be a positive number');
    if (typeof this.gpa !== 'number' || this.gpa < 0 || this.gpa > 4.0) throw new Error('GPA must be a number between 0 and 4.0');
  }

  /**
   * Converts the instance to a plain JSON object
   * @returns {Object}
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
   * Creates a Student instance from a plain object
   * @param {Object} obj
   * @returns {Student}
   */
  static fromObject(obj) {
    return new Student(obj);
  }
}
