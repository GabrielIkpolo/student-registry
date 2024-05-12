
# Student Registry

This is a basic application for registering students, with administrators having the functionality to retrieve student records based on categories such as all students, students by level, or by department. Additionally, administrators can export the data as a CSV file. The application is built with React.js bundled with Vite, and Node.js with Express, PostgreSQL, and Prisma.

## Getting Started

To run this application, you will need to have PostgreSQL installed and properly configured.

### Installation

1. Clone the repository:

```git clone https://github.com/GabrielIkpolo/student-registry.git```


2. Create a `.env` file in the root directory of both the UI and server directories.

3. In the UI `.env` file, add:
```
VITE_REACT_APP_API_BASE_URL="http://localhost:5000"
```

4. In the server `.env` file, add:

```
PORT=5000
JWT_SECRET="hdksddowncocic@#;322@Hanhdhdshdhdhjdkdkdiey;"

ALLOWED_ORIGINS="http://localhost:5000"

DATABASE_URL="postgresql://<your-username>:<your-password>@localhost:5432/student_registry?schema=public"
```

5. Navigate to the UI directory and install dependencies:

```
cd ui
npm install
```

6. Navigate to the server directory and install dependencies:

```
cd server
npm install
npx prisma generate
npx prisma db push
```


Once all dependencies are installed, start both applications (UI and server) separately by running:

```npm run dev``` for the ui

and 

```npm run start``` for the server


### Usage

1. To insert an admin user, send a POST request to the following URL using Postman:

http://localhost:5000/api/register


Example JSON data:
```json
{
    "email": "gab@gmail.com",
    "fullName": "Gab Olaf",
    "password": "password123",
    "role": 2
}

```