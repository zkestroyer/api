# Student Management System SOAP API

A robust SOAP API for managing student records, built with Node.js, Express, and node-soap.

## SOAP Architecture Overview

This project implements a SOAP (Simple Object Access Protocol) API using the `node-soap` library. It defines operations and types in a WSDL (Web Services Description Language) file, which acts as the contract between the server and clients.

The system uses an object-oriented layered architecture:
- **Models**: Defines the `Student` entity with validation.
- **Repository**: Provides an in-memory data store with pre-seeded data.
- **Service**: Implements the SOAP operations mapping to the WSDL.
- **Server**: Exposes the SOAP endpoint using Express.

## Setup Instructions

1. Ensure Node.js is installed.
2. Run `npm install` to install dependencies.
3. Start the server with `npm start`.
4. The SOAP endpoint will be available at `http://localhost:3002/wsdl`.

## WSDL Explanation

The WSDL file (`src/wsdl/student.wsdl`) defines:
- **Types**: XML Schema definitions for `Student`, lists, and request/response messages.
- **Messages**: The inputs and outputs for each operation.
- **PortType**: `StudentManagementPortType` outlining 5 operations (GetStudents, GetStudent, AddStudent, UpdateStudent, DeleteStudent).
- **Binding**: Specifies SOAP 1.1 over HTTP and document/literal style.
- **Service**: The endpoint URL for the API.

## Sample XML Requests/Responses

### GetStudents
**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsdl="http://localhost:3002/wsdl">
   <soapenv:Header/>
   <soapenv:Body>
      <wsdl:GetStudentsRequest/>
   </soapenv:Body>
</soapenv:Envelope>
```

### GetStudent
**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsdl="http://localhost:3002/wsdl">
   <soapenv:Header/>
   <soapenv:Body>
      <wsdl:GetStudentRequest>
         <wsdl:id>YOUR_UUID_HERE</wsdl:id>
      </wsdl:GetStudentRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

### AddStudent
**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsdl="http://localhost:3002/wsdl">
   <soapenv:Header/>
   <soapenv:Body>
      <wsdl:AddStudentRequest>
         <wsdl:student>
            <wsdl:name>John Doe</wsdl:name>
            <wsdl:email>john.doe@university.edu</wsdl:email>
            <wsdl:course>Physics</wsdl:course>
            <wsdl:year>1</wsdl:year>
            <wsdl:gpa>3.2</wsdl:gpa>
         </wsdl:student>
      </wsdl:AddStudentRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

### UpdateStudent
**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsdl="http://localhost:3002/wsdl">
   <soapenv:Header/>
   <soapenv:Body>
      <wsdl:UpdateStudentRequest>
         <wsdl:id>YOUR_UUID_HERE</wsdl:id>
         <wsdl:student>
            <wsdl:name>John Doe Updated</wsdl:name>
            <wsdl:email>john.updated@university.edu</wsdl:email>
            <wsdl:course>Physics</wsdl:course>
            <wsdl:year>2</wsdl:year>
            <wsdl:gpa>3.5</wsdl:gpa>
         </wsdl:student>
      </wsdl:UpdateStudentRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

### DeleteStudent
**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsdl="http://localhost:3002/wsdl">
   <soapenv:Header/>
   <soapenv:Body>
      <wsdl:DeleteStudentRequest>
         <wsdl:id>YOUR_UUID_HERE</wsdl:id>
      </wsdl:DeleteStudentRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

## Folder Structure

```
src/
├── server.js
├── models/
│   └── Student.js
├── data/
│   └── StudentRepository.js
├── services/
│   └── StudentSoapService.js
└── wsdl/
    └── student.wsdl
package.json
README.md
```

**Author**: Zainab Khan
