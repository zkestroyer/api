import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a Student in the system.
 */
class Student {
  /**
   * Creates a new Student instance.
   * @param {Object} params - The student parameters.
   * @param {string} [params.id] - The unique identifier (generated if not provided).
   * @param {string} params.name - The student's name.
   * @param {string} params.email - The student's email.
   * @param {string} params.course - The student's course.
   * @param {number} params.year - The student's year of study.
   * @param {number} params.gpa - The student's GPA.
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
   * Validates the student's properties.
   * @throws {Error} If validation fails.
   */
  validate() {
    if (!this.name || typeof this.name !== 'string') throw new Error('Valid name is required');
    if (!this.email || !this.email.includes('@')) throw new Error('Valid email is required');
    if (!this.course || typeof this.course !== 'string') throw new Error('Valid course is required');
    if (typeof this.year !== 'number' || this.year < 1) throw new Error('Valid year is required');
    if (typeof this.gpa !== 'number' || this.gpa < 0.0 || this.gpa > 4.0) throw new Error('Valid gpa between 0.0 and 4.0 is required');
  }

  /**
   * Converts the student to a JSON-friendly object.
   * @returns {Object} The student object.
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      course: this.course,
      year: this.year,
      gpa: this.gpa,
    };
  }

  /**
   * Creates a Student instance from a plain object.
   * @param {Object} obj - The plain object.
   * @returns {Student} The new Student instance.
   */
  static fromObject(obj) {
    return new Student(obj);
  }
}

export default Student;
