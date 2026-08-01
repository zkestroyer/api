import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a Student in the system.
 * @class Student
 */
export default class Student {
  /**
   * Creates a new Student instance.
   * @param {Object} data - Student data
   * @param {string} [data.id] - The unique identifier
   * @param {string} data.name - The full name
   * @param {string} data.email - The email address
   * @param {string} data.course - The enrolled course
   * @param {number} data.year - The year of study
   * @param {number} data.gpa - The student's GPA
   */
  constructor({ id = uuidv4(), name, email, course, year, gpa }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.course = course;
    // ensure year and gpa are numbers when creating from SOAP objects
    this.year = Number(year);
    this.gpa = Number(gpa);
  }

  /**
   * Validates the student data.
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.name || typeof this.name !== 'string') throw new Error('Valid name is required');
    if (!this.email || !this.email.includes('@')) throw new Error('Valid email is required');
    if (!this.course || typeof this.course !== 'string') throw new Error('Valid course is required');
    if (!this.year || typeof this.year !== 'number' || this.year < 1 || isNaN(this.year)) throw new Error('Valid year is required');
    if (this.gpa === undefined || typeof this.gpa !== 'number' || this.gpa < 0 || this.gpa > 4.0 || isNaN(this.gpa)) throw new Error('Valid GPA is required');
  }

  /**
   * Converts the instance to a plain JSON object.
   * @returns {Object} JSON representation of the student
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
   * @param {Object} data - Plain object data
   * @returns {Student} New Student instance
   */
  static fromObject(data) {
    const student = new Student(data);
    student.validate();
    return student;
  }
}
