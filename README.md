# School Management Application

The School Management Application is a web-based application designed to manage schools, including user authentication, school creation, and related functionalities.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with API key and token
- Sign up and log in functionality
- Create schools with name and photo
- ...

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Postman (for testing API endpoints)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Priyanka-2808/school-management-application.git

2. Change into the project directory:

    ```bash
    cd school-management-application

3. Install dependencies:
    ```bash
    npm install

4. Configure environment variables:
    Create a .env file in the root of the project and set the following variables:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    API_KEY_SECRET=your_api_key_secret
    JWT_SECRET=your_jwt_secret

Replace the placeholders with your MongoDB connection string, API key secret, and JWT secret.

5. Run the application:
    ```bash
    npm start

The application should be running at http://localhost:3000.

### Usage
- Sign up for an account using the /signup endpoint.
- Log in using the /login endpoint to obtain an authentication token.
- Use the token and API key in the headers for authenticated requests.
- Create a school using the /create-school endpoint.
