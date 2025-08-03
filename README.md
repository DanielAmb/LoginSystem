# Simple Login & Appointment Scheduling Application

A full-stack authentication system with Spring Boot backend and React frontend.


## Features

- **User Authentication**:
  - Registration with email/password
  - Secure login/logout
- **Frontend**:
  - Responsive React interface
  - Form validation
- **Backend**:
  - Spring Security configuration
  - MySQL database integration
  - RESTful API endpoints

## Technologies

**Frontend**:
- React 18
- Axios for API calls

**Backend**:
- Spring Boot 3.x
- Spring Security
- MySQL database

## Setup Instructions

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven

### Installation

**Clone the repository**:

git clone https://github.com/DanielAmb/LoginSystem.git

cd LoginSystem


### Run Project

In server/src/main/resources/application.properties:

Configure spring.datasource.password=yourpassword

cd server

mvn spring-boot:run

In a separate terminal:

cd /client

npm install

npm start
