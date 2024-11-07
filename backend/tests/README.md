# BMS-Suite Testing Documentation

This document provides an overview of the unit tests for the project’s `employee` and `company` routes, as well as instructions for running these tests.

## Table of Contents
- [Overview](#overview)
- [Tests Description](#tests-description)
  - [Employee Controller Tests](#employee-controller-tests)
  - [Company Routes Tests](#company-routes-tests)
- [Running the Tests](#running-the-tests)

## Overview

This project includes unit tests for controller logic and very soon, integration tests for the API endpoints. These tests ensure the functionality of authentication routes for `employee` and `company` resources, including registration, login, and error handling for various validation cases. We will keep adding more tests as we go on.

## Tests Description

### Employee Controller Tests

The employee controller tests validate the behavior of the `employeeRegister` and `employeeLogin` functions:

- **employeeRegister**
  - **Valid Invite Code**: Verifies that an employee can register successfully when a valid invite code is provided.
  - **Invalid Invite Code**: Ensures a `404` error is returned when an invalid invite code is provided.

- **employeeLogin**
  - **Successful Login**: Validates that an employee can log in with the correct email and password, receiving a success message and token.

### Company Routes Tests

The company routes tests cover both registration and login endpoints for companies:

- **POST /api/company/register**
  - **Successful Registration**: Verifies that a new company can register successfully with a unique EIN and email.
  - **EIN Already Exists**: Ensures a `404` error is returned when a company attempts to register with an existing EIN.
  - **Email Already Exists**: Ensures a `400` error is returned when a company attempts to register with an existing email.

- **POST /api/company/login**
  - **Successful Login**: Validates that a company can log in successfully with the correct email and password, receiving a token in the response.
  - **Invalid Password**: Ensures a `400` error is returned when an incorrect password is provided.
  - **Email Not Found**: Ensures a `400` error is returned when an email is not found in the database.

## Running the Tests

To run the tests, use the following commands:

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Run tests**:

   To run all test suites:
   ```bash
   npm test
   ```

   To run specific test files (e.g., `employeeRoutes.test.js`):
   ```bash
   npm test tests/employeeRoutes.test.js
   ```

Ensure that the test database is configured correctly and accessible to avoid connection errors during testing.

---
