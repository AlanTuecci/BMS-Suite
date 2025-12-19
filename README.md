# BMS-Suite

A web-based service that provides inventory management, cash controls, and employee time-punch management.

By Alan Tuecci, Zakaria Almardaee, and Dainell Baker

### Version 1.0.0

Release-2 -> Docker release

### Prerequisite Environment Variable Configuration

Create a `.env` file in /backend/:

Replace the placeholders within the brackets with appropriate data and delete the brackets. Please note the asterisks and the associated information.

```env
DB_HOST=postgres

POSTGRES_USER={db_username}
POSTGRES_PASSWORD={db_password}
POSTGRES_DB={db_database}
POSTGRES_PORT=5432

SERVER_EMAIL={your_email}@gmail.com
SERVER_EMAIL_PASSWORD={your_gmail_app_password}

DEV_SERVER_PORT=5000
DEV_CLIENT_URL=http://localhost/bms-suite
DEV_CLIENT_PORT=3000
DEV_SECRET={dev_jwt_secret}
DEV_TIME_SECRET={dev_jwt_time_secret}

PROD_SERVER_PORT=80 (or 443*)
PROD_CLIENT_URL={http (or https*)}://{prod_client_url}/bms-suite
PROD_CLIENT_PORT=80 (or 443*)
PROD_SECRET={prod_jwt_secret}
PROD_TIME_SECRET={dev_jwt_time_secret}

*Applicable only if SSL/TLS termination is configured by a separate reverse proxy
```

Then, create a `.env` file in /frontend/:

Replace the placeholders within the brackets with appropriate data and delete the brackets. Please note the asterisks and the associated information.

```env
REACT_APP_DEV_API_URL=http://{dev_server_url}:8080/bms-suite/api
REACT_APP_API_URL_PROD={http (or https*)}://{prod_server_url}:{80 (or 443*)}/bms-suite/api

*Applicable only if SSL/TLS termination is configured by a separate reverse proxy
```

Note: Instructions for obtaining an app password from Google can be found at this link [Google - Sign in with app passwords](https://support.google.com/accounts/answer/185833?hl=en)

### To launch a development build

In the project root, open a terminal and enter the following command:

```bash
docker compose -f docker-compose.dev.yaml up --build
```

Then, open a browser and navigate to http://localhost/bms-suite:3000 to access the live development build.

### To launch a production build

In the project root, open a terminal and enter the following command:

```bash
docker compose up --build
```

Then, open a browser and navigate to the URL configured in the backend environment variable file to access the production build.

### Additional Documentation

There is additional documentation for the API routes.

This documentation is located in a `README.md` file found in the following directory: /backend/src/routes/README.md.

This is the URL for the documentation: [BMS-Suite API Documentation](https://github.com/AlanTuecci/BMS-Suite/tree/b475cc68e69685c0866b10e3a8359257fd56d220/backend/src/routes#readme)
