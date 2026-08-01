import repository from '../data/StudentRepository.js';
import Student from '../models/Student.js';

/**
 * Service providing SOAP operations.
 * @class StudentSoapService
 */
export default class StudentSoapService {
  /**
   * Returns the service object structured for node-soap and WSDL.
   * @returns {Object} The SOAP service object
   */
  static getService() {
    return {
      StudentManagementService: {
        StudentManagementPort: {
          /**
           * Get all students
           * @param {Object} args - SOAP arguments
           * @returns {Object} SOAP response
           */
          GetStudents: function(args) {
            const students = repository.getAll().map(s => s.toJSON());
            return { students: students };
          },
          /**
           * Get a single student by ID
           * @param {Object} args - SOAP arguments
           * @returns {Object} SOAP response
           */
          GetStudent: function(args) {
            const student = repository.getById(args.id);
            if (!student) throw {
              Fault: {
                Code: { Value: "soap:Client" },
                Reason: { Text: "Student not found" }
              }
            };
            return { student: student.toJSON() };
          },
          /**
           * Add a new student
           * @param {Object} args - SOAP arguments
           * @returns {Object} SOAP response
           */
          AddStudent: function(args) {
            try {
              const student = Student.fromObject(args.student);
              repository.add(student);
              return { student: student.toJSON() };
            } catch (err) {
              throw {
                Fault: {
                  Code: { Value: "soap:Client" },
                  Reason: { Text: err.message }
                }
              };
            }
          },
          /**
           * Update a student
           * @param {Object} args - SOAP arguments
           * @returns {Object} SOAP response
           */
          UpdateStudent: function(args) {
            try {
              const updated = repository.update(args.id, args.student);
              if (!updated) throw {
                Fault: {
                  Code: { Value: "soap:Client" },
                  Reason: { Text: "Student not found" }
                }
              };
              return { student: updated.toJSON() };
            } catch (err) {
              throw {
                Fault: {
                  Code: { Value: "soap:Client" },
                  Reason: { Text: err.message }
                }
              };
            }
          },
          /**
           * Delete a student
           * @param {Object} args - SOAP arguments
           * @returns {Object} SOAP response
           */
          DeleteStudent: function(args) {
            const deleted = repository.delete(args.id);
            if (!deleted) throw {
              Fault: {
                Code: { Value: "soap:Client" },
                Reason: { Text: "Student not found" }
              }
            };
            return { success: true };
          }
        }
      }
    };
  }
}
