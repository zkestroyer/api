import grpc from '@grpc/grpc-js';
import repository from '../data/StudentRepository.js';
import Student from '../models/Student.js';

/**
 * Implementation of the StudentService gRPC service.
 */
export default class StudentGrpcService {
  /**
   * Get a list of all students.
   * @param {Object} call - The gRPC call object.
   * @param {function} callback - The callback to send the response.
   */
  static getStudents(call, callback) {
    const students = repository.findAll().map(s => s.toJSON());
    callback(null, { students });
  }

  /**
   * Get a single student by ID.
   * @param {Object} call - The gRPC call object containing the request.
   * @param {function} callback - The callback to send the response.
   */
  static getStudent(call, callback) {
    const id = call.request.id;
    const student = repository.findById(id);

    if (student) {
      callback(null, student.toJSON());
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: `Student with ID ${id} not found.`
      });
    }
  }

  /**
   * Create a new student.
   * @param {Object} call - The gRPC call object containing the request.
   * @param {function} callback - The callback to send the response.
   */
  static createStudent(call, callback) {
    try {
      const student = new Student(call.request);
      student.validate();
      repository.create(student);
      callback(null, student.toJSON());
    } catch (error) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: error.message
      });
    }
  }

  /**
   * Update an existing student.
   * @param {Object} call - The gRPC call object containing the request.
   * @param {function} callback - The callback to send the response.
   */
  static updateStudent(call, callback) {
    try {
      const id = call.request.id;
      const existing = repository.findById(id);
      
      if (!existing) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: `Student with ID ${id} not found.`
        });
      }
      
      const updatedData = { ...existing.toJSON(), ...call.request };
      const testStudent = new Student(updatedData);
      testStudent.validate();
      
      const updatedStudent = repository.update(id, call.request);
      callback(null, updatedStudent.toJSON());
    } catch (error) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: error.message
      });
    }
  }

  /**
   * Delete a student by ID.
   * @param {Object} call - The gRPC call object containing the request.
   * @param {function} callback - The callback to send the response.
   */
  static deleteStudent(call, callback) {
    const id = call.request.id;
    const deleted = repository.delete(id);

    if (deleted) {
      callback(null, { success: true, message: `Student ${id} deleted successfully.` });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: `Student with ID ${id} not found.`
      });
    }
  }

  /**
   * Gets the service implementation map.
   * @returns {Object} Map of RPC methods to handler functions.
   */
  static getHandlers() {
    return {
      GetStudents: StudentGrpcService.getStudents,
      GetStudent: StudentGrpcService.getStudent,
      CreateStudent: StudentGrpcService.createStudent,
      UpdateStudent: StudentGrpcService.updateStudent,
      DeleteStudent: StudentGrpcService.deleteStudent
    };
  }
}
