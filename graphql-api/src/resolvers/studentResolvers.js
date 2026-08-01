import StudentService from '../services/StudentService.js';
import { GraphQLError } from 'graphql';

/**
 * Helper to wrap errors as GraphQLError
 * @param {Error} error - The error to wrap
 * @returns {GraphQLError} The wrapped GraphQL error
 */
const wrapError = (error) => {
  return new GraphQLError(error.message, {
    extensions: {
      code: 'BAD_USER_INPUT',
    },
  });
};

/**
 * GraphQL resolvers for Student operations.
 */
export const resolvers = {
  Query: {
    /**
     * Resolver for fetching all students.
     */
    students: () => {
      try {
        return StudentService.getAllStudents();
      } catch (error) {
        throw wrapError(error);
      }
    },
    
    /**
     * Resolver for fetching a single student by ID.
     */
    student: (_, { id }) => {
      try {
        return StudentService.getStudentById(id);
      } catch (error) {
        throw wrapError(error);
      }
    }
  },
  
  Mutation: {
    /**
     * Resolver for creating a new student.
     */
    createStudent: (_, { input }) => {
      try {
        return StudentService.createStudent(input);
      } catch (error) {
        throw wrapError(error);
      }
    },
    
    /**
     * Resolver for updating an existing student.
     */
    updateStudent: (_, { id, input }) => {
      try {
        return StudentService.updateStudent(id, input);
      } catch (error) {
        throw wrapError(error);
      }
    },
    
    /**
     * Resolver for deleting a student.
     */
    deleteStudent: (_, { id }) => {
      try {
        return StudentService.deleteStudent(id);
      } catch (error) {
        throw wrapError(error);
      }
    }
  }
};
