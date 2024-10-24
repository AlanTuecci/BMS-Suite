const request = require('supertest');
const sinon = require('sinon');
const app = require('../../src/index');
const db = require('../../src/db');
const bcrypt = require('bcryptjs');

describe('Company Routes', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST /api/company/register', () => {
    it('should register a new company successfully', async () => {
      sinon.stub(db, 'query')
        .onFirstCall().resolves({ rows: [] })
        .onSecondCall().resolves({ rows: [] })
        .onThirdCall().resolves();

      const response = await request(app)
        .post('/api/company/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          company_ein: '123456789',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('The registration was successful!');
    });

    it('should return error when EIN already exists', async () => {
      sinon.stub(db, 'query')
        .onFirstCall().resolves({ rows: [] })
        .onSecondCall().resolves({ rows: [{ company_ein: '123456789' }] });

      const response = await request(app)
        .post('/api/company/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          company_ein: '123456789',
        });

      expect(response.statusCode).toBe(404);
      expect(response.body.errors[0].msg).toBe('There is already a registered company with that same EIN.');
    });

    it('should return error when email already exists', async () => {
      sinon.stub(db, 'query').resolves({ rows: [{ company_admin_email: 'test@example.com' }] });

      const response = await request(app)
        .post('/api/company/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          company_ein: '123456789',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].msg).toBe('Email already exists.');
    });
  });

  describe('POST /api/company/login', () => {
    it('should login successfully and return token', async () => {
      const queryStub = sinon.stub(db, 'query').resolves({
        rows: [{ company_id: 1, company_admin_email: 'test@example.com', company_admin_password: '$2a$10$hash' }],
      });
      
      const compareStub = sinon.stub(bcrypt, 'compare').resolves(true);
      
      const response = await request(app)
        .post('/api/company/login')
        .send({
          company_id: 1,
          company_admin_email: 'test@example.com',
          password: 'password123',
        });
      
      expect(queryStub.calledOnce).toBe(true);
      expect(compareStub.calledOnce).toBe(true);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successful.');
      expect(response.headers['set-cookie']).toBeDefined();
    });
      

    it('should return an error for invalid password', async () => {
      sinon.stub(db, 'query').resolves({
        rows: [{ company_id: 1, company_admin_email: 'test@example.com', company_admin_password: '$2a$10$hash' }],
      });

      sinon.stub(bcrypt, 'compare').resolves(false);

      const response = await request(app)
        .post('/api/company/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].msg).toBe('Invalid password for inputted email.');
    });

    it('should return error when email is not found', async () => {
      sinon.stub(db, 'query').resolves({ rows: [] });

      const response = await request(app)
        .post('/api/company/login')
        .send({
          email: 'notfound@example.com',
          password: 'password123',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].msg).toBe('Email not found.');
    });
  });
});
