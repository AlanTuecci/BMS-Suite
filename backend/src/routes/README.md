# Backend Routes Documentation

## For version >= 0.2.0

## Company Routes

### server_url/api/company/register

#### POST Request

This route is used by company administrators who would like to open a company account.

The request body is expected to follow this format:

```json
{
  "email": "", // Type: string | Max Length: 50 characters
  "password": "", // Type: string | Min Length: 6 characters | Max Length: 15 characters
  "company_ein": "" // Type: string | Min Length: 9 characters | Max Length: 9 characters
}
```

The response will always contain a JSON object.
If the registration is successful, a response will return this JSON object with status 201:

```json
{
  "success": true,
  "message": "The registration was sucessful!"
}
```

Types of errors:

- Expected Errors:
  Expected errors would return a JSON object in a response with status 400/404 and the following format:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "Alan.Tueccioutlook.com",
      "msg": "Please provide a valid email.",
      "path": "email",
      "location": "body"
    },
    // If there were more errors present they would follow this format:
    {
      "type": "field",
      "value": "", // This would be the faulty value in the request field
      "msg": "", // This would be an error message
      "path": "", // This would be the faulty field in the request
      "location": "body"
    }
  ]
}
```

- Unexpected errors
  Unexpected errors would return a JSON object in a response with status 500 and the following format:

```json
{
  "errors": [
    {
      "type": "unknown",
      "value": "unknown",
      "msg": "unknown",
      "path": "unknown",
      "location": "unknown"
    }
  ],
  "error": {
    // Here would be an unformatted error object, good luck
  }
}
```

### server_url/api/company/login

#### POST Request

This route is used by company administrators who would like to be authenticated.

The request body is expected to follow this format:

```json
{
  "email": "", // Type: string | Max Length: 50 characters
  "password": "" // Type: string | Min Length: 6 characters | Max Length: 15 characters
}
```

The response will always contain a JSON object.
If the registration is successful, a response will return a JWT in a cookie and this JSON object with status 200:

```json
{
  "success": true,
  "message": "Login sucessful!"
}
```

Types of errors:

- Expected Errors:
  Expected errors would return a JSON object in a response with status 400 and the following format:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "Alan.Tueccioutlook.com",
      "msg": "Please provide a valid email.",
      "path": "email",
      "location": "body"
    },
    // If there were more errors present they would follow this format:
    {
      "type": "field",
      "value": "", // This would be the faulty value in the request field
      "msg": "", // This would be an error message
      "path": "", // This would be the faulty field in the request
      "location": "body"
    }
  ]
}
```

- Unexpected errors
  Unexpected errors would return a JSON object in a response with status 500 and the following format:

```json
{
  "errors": [
    {
      "type": "unknown",
      "value": "unknown",
      "msg": "unknown",
      "path": "unknown",
      "location": "unknown"
    }
  ],
  "error": {
    // Here would be an unformatted error object, good luck
  }
}
```

### server_url/api/company/inviteEmployee

#### POST Request

This is used by company administrators when they would like to initiate the registration process for an employee. The server automatically generates an invite code and emails it to the employee.

Requests for this route must be authenticated with a valid JWT present in a cookie.
The request body is expected to follow this format:

```json
{
  "employee_email": "" // Type: String | Max Length: 50 characters
}
```

The response will always contain a JSON object.
If the invite is successful, the response will contain the following JSON object:

```json
{
  "success": true,
  "message": "Invite sent to ${employee_email}!"
}
```

Types of errors:

- Unauthorized User Error
  Status: 401
  Response Format:

```json
Unauthorized
```

- Improper Email Error
  Status: 400
  Response Format:

```json
{
  "error": "No recipients defined"
}
```

- Unique Code Generation Error
  Status: 500
  Response Format:

```json
{
  "error": "Unable to generate unique invite code! Please try again."
}
```

- Employee Already Invited Error
  Status: 404
  Response Format:

```json
{
  "error": "There is already an invite for employee with email ${employee_email}! Please use a different email."
}
```

- Unexpected errors
  Unexpected errors would return a JSON object in a response with status 500 and the following format:

```json
{
  "errors": [
    {
      "type": "unknown",
      "value": "unknown",
      "msg": "unknown",
      "path": "unknown",
      "location": "unknown"
    }
  ],
  "error": {
    // Here would be an unformatted error object, good luck
  }
}
```

### server_url/api/company/getAllInvites

#### POST Request

This is used by company administrators when they would like to see how many active employee invites they have, and the emails associated with each invite code.

Requests for this route must be authenticated with a valid JWT present in a cookie.
No request body is needed.

The response will always contain a JSON object.
If the request is successful, the response will contain the following JSON object:

```json
[
    {
        "company_id": , // Type: Number
        "invite_code": , // Type: Number | Max Length: 6 characters
        "employee_email": "" // Type: String | Max Length: 50 characters
    },
]
```

Types of errors:

- Unauthorized User Error
  Status: 401
  Response Format:

```json
Unauthorized
```

- Unexpected errors
  Unexpected errors would return a JSON object in a response with status 500 and the following format:

```json
{
  "errors": [
    {
      "type": "unknown",
      "value": "unknown",
      "msg": "unknown",
      "path": "unknown",
      "location": "unknown"
    }
  ],
  "error": {
    // Here would be an unformatted error object, good luck
  }
}
```

## Employee Routes

### server_url/api/employee/register

#### POST Request

This route is used by company employees that would like to open an account.

The request body is expected to follow this format:

```json
{
  "email": "", // Type: string | Max Length: 50 characters
  "password": "", // Type: string | Min Length: 6 characters | Max Length: 15 characters
  "full_name": "", // Type: string | Max Length: 50 characters
  "invite_code":  // Type: number | Max Value: 999999
}
```

The response will always contain a JSON object.
If the registration is successful, a response will return this JSON object with status 201:

```json
{
  "success": true,
  "message": "The registration was sucessful!"
}
```

Types of errors:

- Expected Errors:
  Expected errors would return a JSON object in a response with status 400/404 and the following format:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "Alan.Tueccioutlook.com",
      "msg": "Please provide a valid email.",
      "path": "email",
      "location": "body"
    },
    // If there were more errors present they would follow this format:
    {
      "type": "field",
      "value": "", // This would be the faulty value in the request field
      "msg": "", // This would be an error message
      "path": "", // This would be the faulty field in the request
      "location": "body"
    }
  ]
}
```

- Unexpected errors
  Unexpected errors would return a JSON object in a response with status 500 and the following format:

```json
{
  "errors": [
    {
      "type": "unknown",
      "value": "unknown",
      "msg": "unknown",
      "path": "unknown",
      "location": "unknown"
    }
  ],
  "error": {
    // Here would be an unformatted error object, good luck
  }
}
```

### server_url/api/employee/login

#### POST Request

This route is used by company employees who would like to be authenticated.

The request body is expected to follow this format:

```json
{
  "email": "", // Type: string | Max Length: 50 characters
  "password": "" // Type: string | Min Length: 6 characters | Max Length: 15 characters
}
```

The response will always contain a JSON object.
If the registration is successful, a response will return a JWT in a cookie and this JSON object with status 200:

```json
{
  "success": true,
  "message": "Login sucessful!"
}
```

Types of errors:

- Expected Errors:
  Expected errors would return a JSON object in a response with status 400 and the following format:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "Alan.Tueccioutlook.com",
      "msg": "Please provide a valid email.",
      "path": "email",
      "location": "body"
    },
    // If there were more errors present they would follow this format:
    {
      "type": "field",
      "value": "", // This would be the faulty value in the request field
      "msg": "", // This would be an error message
      "path": "", // This would be the faulty field in the request
      "location": "body"
    }
  ]
}
```

- Unexpected errors
  Unexpected errors would return a JSON object in a response with status 500 and the following format:

```json
{
  "errors": [
    {
      "type": "unknown",
      "value": "unknown",
      "msg": "unknown",
      "path": "unknown",
      "location": "unknown"
    }
  ],
  "error": {
    // Here would be an unformatted error object, good luck
  }
}
```

# Universal Routes

### server_url/api/logout

#### POST Request

This route is used by anyone who would like to be unauthenticated.

No request body is needed.

The response will always contain a JSON object.
If the registration is successful, a response will return this JSON object with status 200:

```json
{
  "success": true,
  "message": "Logout sucessful!"
}
```

Types of errors:

- Unexpected errors
  Unexpected errors would return a JSON object in a response with status 500 and the following format:

```json
{
  "errors": [
    {
      "type": "unknown",
      "value": "unknown",
      "msg": "unknown",
      "path": "unknown",
      "location": "unknown"
    }
  ],
  "error": {
    // Here would be an unformatted error object, good luck
  }
}
```
