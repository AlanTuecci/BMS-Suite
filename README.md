# BMS-Suite

By Alan Tuecci, Zakaria Almardaee, and Dainell Baker

### Version 0.0.1

Pre-development template  
All dependencies have been updated to versions that have no known vulnerabilities published on the CWE List

### Dependency Information

To install all necessary node modules, use the following commands:  
- cd backend  
- npm install  
- cd ../  
- cd frontend  
- npm install  

Required: NodeJS version 20.10.0 or greater  
  
For future builds, make sure that PostgreSQL is installed

### To launch the project in development mode

First launch the ExpressJS server by using the following commands:  
- cd backend  
- npm run dev  
  
This will launch ExpressJS in development mode, with Nodemon, which will restart the server once changes to the files are detected
  
Once the ExpressJS server is running, launch the ReactJS development server in a separate terminal instance with the following commands:  
- cd frontend  
- npm start  

### To launch a production build

First run the create-react-app build script by using the following commands:  
- cd frontend  
- npm run build  
  
Second, in a separate terminal, to launch the ExpressJS server, use the following commands:  
- cd backend  
- npm start  
  
Make sure that the ExpressJS server is serving built react files!

## This repository may be set to private in later stages in development