import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
import util from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, 'proto', 'student.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const studentPackage = protoDescriptor.student;

const client = new studentPackage.StudentService('localhost:50051', grpc.credentials.createInsecure());

// Promisify client methods for cleaner async/await
const getStudents = util.promisify(client.GetStudents).bind(client);
const getStudent = util.promisify(client.GetStudent).bind(client);
const createStudent = util.promisify(client.CreateStudent).bind(client);
const updateStudent = util.promisify(client.UpdateStudent).bind(client);
const deleteStudent = util.promisify(client.DeleteStudent).bind(client);

/**
 * Runs the gRPC client test operations.
 */
async function runClient() {
  try {
    console.log('--- 1. List All Students ---');
    let listResponse = await getStudents({});
    console.log(listResponse.students);
    
    if (listResponse.students.length > 0) {
      const firstStudentId = listResponse.students[0].id;
      
      console.log(`\n--- 2. Get One Student (ID: ${firstStudentId}) ---`);
      const student = await getStudent({ id: firstStudentId });
      console.log(student);
    }
    
    console.log('\n--- 3. Create a New Student ---');
    const newStudent = await createStudent({
      name: "Tariq Jameel",
      email: "tariq.j@university.edu",
      course: "Business Administration",
      year: 1,
      gpa: 3.8
    });
    console.log('Created:', newStudent);
    
    console.log('\n--- 4. Update the Student ---');
    const updatedStudent = await updateStudent({
      id: newStudent.id,
      name: "Tariq Jameel updated",
      email: "tariq.j@university.edu",
      course: "Business Administration",
      year: 2,
      gpa: 3.9
    });
    console.log('Updated:', updatedStudent);
    
    console.log(`\n--- 5. Delete the Student (ID: ${newStudent.id}) ---`);
    const deleteRes = await deleteStudent({ id: newStudent.id });
    console.log('Delete Response:', deleteRes);
    
    console.log('\n--- 6. List All Students Again ---');
    listResponse = await getStudents({});
    console.log(listResponse.students);
    
  } catch (error) {
    console.error('Error during client execution:', error);
  }
}

runClient();
