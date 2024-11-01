# BMS-Suite

By Alan Tuecci, Zakaria Almardaee, and Dainell Baker

### Version 0.3.1

Authenticator-Dev-1 -> Frontend Registration/Login Implementation

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

In a PostgreSQL shell, copy and paste the entire contents of the 'database.sql' file found in the backend directory.

### Environment Variables

Create a `.env` file in the (backend) project root with the following content:

```env
DB_USER={db_username}
DB_HOST={db_hostname}
DB_DATABASE={db_database}
DB_PASS={db_password}
DB_PORT={db_port}

SERVER_EMAIL={your_email}@gmail.com
SERVER_EMAIL_PASSWORD={your_gmail_app_password}

DEV_SERVER_PORT={dev_server_port}
DEV_CLIENT_URL={dev_client_url}
DEV_CLIENT_PORT={dev_client_port}
DEV_SECRET={dev_jwt_secret}

PROD_SERVER_PORT={prod_server_port}
PROD_CLIENT_URL={prod_client_url}
PROD_CLIENT_PORT={prod_server_port}
PROD_SECRET={prod_jwt_secret}
```

Then, create a '.env' file in the (frontend) project root with the following content:

```env
REACT_APP_DEV_API_URL={dev_server_url}/api
REACT_APP_API_URL_PROD={prod_server_url}/api
```

Note: Instructions for obtaining an app password from Google can be found at this link [Google - Sign in with app passwords](https://support.google.com/accounts/answer/185833?hl=en)

### To launch the project in development mode

First, make sure the environment is running in dev mode by using the following command:

(For Windows machines)

```bat
SET NODE_ENV=development
```

(For linux/mac machines)

```bash
EXPORT NODE_ENV=development
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

First, make sure the environment is running in prod mode by using the following command:

(For Windows machines)

```bat
SET NODE_ENV=production
```

(For linux/mac machines)

```bash
EXPORT NODE_ENV=production
```

Then build the static frontend files and start the server using the following commands:

```bash
cd frontend
npm run build
cd ../backend
npm start
```

### Additional Documentation

There is additional documentation for the API routes. 

This documentation is located in a readme.md file found in the following directory: /backend/src/routes/readme.md.

This is the URL for the documentation: [BMS-Suite API Documentation](https://github.com/AlanTuecci/BMS-Suite/tree/b475cc68e69685c0866b10e3a8359257fd56d220/backend/src/routes#readme)
