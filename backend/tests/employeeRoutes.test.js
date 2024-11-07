const sinon = require("sinon");
const { employeeRegister, employeeLogin } = require("../src/controllers/employeeAuth");
const db = require("../src/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

describe("employeeRegister Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        invite_code: 12345,
        full_name: "John Doe",
        email: "johndoe@example.com",
        password: "securePass123",
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should successfully register an employee with a valid invite code", async () => {
    sinon.stub(db, "query")
      .onFirstCall().resolves({ rows: [{ company_id: 1 }] })
      .onSecondCall().resolves();
    sinon.stub(bcrypt, "hash").resolves("hashedPassword123");
    sinon.stub(validationResult, "withDefaults").returns(() => ({ isEmpty: () => true, array: () => [] }));

    await employeeRegister(req, res, next);

    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, {
      success: true,
      message: "The registration was successful!",
    });
  });

  it("should return an error if the invite code is invalid", async () => {
    sinon.stub(db, "query").onFirstCall().resolves({ rows: [] });
  
    await employeeRegister(req, res, next);

    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, {
      errors: [
        {
          type: "field",
          value: req.body.email,
          msg: `Unable to find invite code for email: ${req.body.email}`,
          path: "email",
          location: "body",
        },
      ],
    });
  });
});

describe("employeeLogin Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: "johndoe@example.com",
        password: "securePass123",
      },
      user: null,
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      cookie: sinon.stub().returnsThis(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should log in an employee with correct email and password", async () => {
    sinon.stub(db, "query").resolves({
      rows: [
        {
          company_id: 1,
          employee_id: 123,
          employee_email: "johndoe@example.com",
          employee_password: "$2a$10$hashedPassword",
        },
      ],
    });
    
    sinon.stub(bcrypt, "compare").resolves(true);
    sinon.stub(jwt, "sign").returns("someMockToken");

    req.user = {
      company_id: 1,
      employee_id: 123,
      employee_email: "johndoe@example.com",
    };

    await employeeLogin(req, res, next);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(
      res.cookie,
      "token",
      sinon.match.string,
      { httpOnly: true }
    );
    sinon.assert.calledWith(res.json, {
      success: true,
      message: "Login successful.",
    });
  });
});
