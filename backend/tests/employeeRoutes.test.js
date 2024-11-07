const sinon = require("sinon");
const { employeeRegister } = require("../src/controllers/employeeAuth");
const db = require("../src/db");
const bcrypt = require("bcryptjs");

describe("employeeRegister Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        invite_code: "valid_code",
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

    await employeeRegister(req, res, next);

    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, {
      success: true,
      message: "The registration was successful!",
    });
  });
});
