# BMS-Suite

By Alan Tuecci, Zakaria Almardaee, and Dainell Baker

### Version 0.1.0

Authenticator-Beta-1 -> All dependencies have been updated to versions that have no known vulnerabilities published on the CWE List

### Dependency Information

To install all necessary node modules, use the following commands:

```bash
cd backend
npm install
cd ../
cd frontend
npm install
```

Required:

- NodeJS version 20.10.0 or greater
- PostgreSQL v16

### Database Setup

In a PostgreSQL shell, copy and paste the entire contents of the database.sql file in the backend directory.

### Environment Variables

Create a `.env` file in the (backend) project root with the following content:

```env
PORT = {port}
SERVER_URL = http://{url}:{port}
CLIENT_URL = http://{url}:{port}
SECRET = {secret_key}
DB_USER= {db_username}
DB_HOST= {db_hostname}
DB_DATABASE= {db_database}
DB_PASS= {db_password}
DB_PORT= {db_port}
```

### To launch the project in development mode

First, update the CLIENT_URL environment variable in the backend folder to make sure that you are accepting connections from the react development server

```env
CLIENT_URL=http://localhost:5000
```

Then, launch the ExpressJS server by using the following commands:

```bash
cd backend
npm run dev
```

This will launch ExpressJS in development mode, with Nodemon, which will restart the server once changes to the files are detected

Once the ExpressJS server is running, launch the ReactJS development server in a separate terminal instance with the following commands:

```bash
cd frontend
npm start
```

### To launch a production build

First run the create-react-app build script by using the following commands:

```bash
cd frontend
npm run build
```

Second, in a separate terminal, to launch the ExpressJS server, use the following commands:

```bash
cd backend
npm start
```

Make sure that the production ExpressJS server is serving built react files!

## This repository may be set to private in later stages in development
