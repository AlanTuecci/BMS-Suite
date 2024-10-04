# BMS-Suite

By Alan Tuecci, Zakaria Almardaee, and Dainell Baker

### Version 0.2.0

Authenticator-Beta-2 -> Overhauled Signin/Signup and Database

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
SERVER_EMAIL= {your_email}@gmail.com
SERVER_EMAIL_PASSWORD= {your_gmail_app_password}
```

Note: Instructions for obtaining an app password from Google can be found at this link [Google - Sign in with app passwords](https://support.google.com/accounts/answer/185833?hl=en)

### Additional Documentation of Backend Routes

Additional documentation of the backend routes can be found in the README.md file found in the following directory: /backend/src/routes

### To launch the project in development mode

First, update the CLIENT_URL environment variable in the backend folder to make sure that you are accepting connections from the local react development server

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
