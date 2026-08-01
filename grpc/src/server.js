import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
import StudentGrpcService from './services/StudentGrpcService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the protobuf definition
const PROTO_PATH = path.join(__dirname, 'proto', 'student.proto');

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const studentPackage = protoDescriptor.student;

/**
 * Main function to start the gRPC server.
 */
function main() {
  const server = new grpc.Server();
  
  // Register the service implementation
  server.addService(studentPackage.StudentService.service, StudentGrpcService.getHandlers());
  
  const address = '0.0.0.0:50051';
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Failed to bind server:', err);
      return;
    }
    console.log(`gRPC Server running at ${address}`);
  });
}

main();
