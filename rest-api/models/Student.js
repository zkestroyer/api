import { v4 as uuidv4 } from 'uuid';

/**
 * Class representing a Student.
 */
class Student {
  /**
   * Create a student.
   * @param {Object} params - Student parameters
   * @param {string} [params.id] - Student UUID (auto-generated if not provided)
   * @param {string} params.name - Student's full name
   * @param {string} params.email - Student's email address
   * @param {string} params.course - Student's course/major
   * @param {number} params.year - Student's year of study (1-4)
   * @param {number} params.gpa - Student's GPA (0.0-4.0)
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
   * @throws {Error} If validation fails.
   */
  validate() {
    if (!this.name || typeof this.name !== 'string' || this.name.trim() === '') {
      throw new Error('Name is required and must be a non-empty string.');
    }
    if (!this.email || typeof this.email !== 'string' || !this.email.includes('@')) {
      throw new Error('Valid email is required.');
    }
    if (!this.course || typeof this.course !== 'string' || this.course.trim() === '') {
      throw new Error('Course is required and must be a non-empty string.');
    }
    if (typeof this.year !== 'number' || this.year < 1 || this.year > 5) {
      throw new Error('Year must be a number between 1 and 5.');
    }
    if (typeof this.gpa !== 'number' || this.gpa < 0 || this.gpa > 4.0) {
      throw new Error('GPA must be a number between 0.0 and 4.0.');
    }
  }

  /**
   * Returns a plain object representation of the student.
   * @returns {Object} Student object
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
   * @param {Object} obj - The object to create the student from
   * @returns {Student} New Student instance
   */
  static fromObject(obj) {
    return new Student(obj);
  }
}

export default Student;
