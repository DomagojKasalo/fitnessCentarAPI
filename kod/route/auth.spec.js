const { expect } = require('chai');
const globalApi = global.api; 
const usersRepo = require('../repo/users');

describe('Auth Routes', function () {
  let createdUser
 
  describe('POST /register', function () {
    it('should register a new user successfully', async function () {
      const newUser = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
        role: 'member',
      };

      const resp = await globalApi
        .post('/register')
        .send(newUser)
        .expect(201);

      expect(resp.body).to.include({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });
      const userFromDb = await usersRepo.getByEmail(newUser.email);
      expect(userFromDb).to.not.be.null;
      createdUser = userFromDb; 
    });

    it('should fail when email is already registered', async function () {
      const duplicateUser = {
        name: 'Jane Doe',
        email: createdUser.email, 
        password: 'anotherpassword',
        role: 'member',
      };

      const resp = await globalApi
        .post('/register')
        .send(duplicateUser)
        .expect(400);

      expect(resp.body).to.have.property('error');
    });
  });

  describe('POST /login', function () {
    it('should login successfully with valid credentials', async function () {
      const loginData = {
        email: createdUser.email,
        password: 'password123', 
      };

      const resp = await globalApi
        .post('/login')
        .send(loginData)
        .expect(200);

      expect(resp.body).to.have.property('token');
      expect(resp.body.token).to.be.a('string');
    });

    it('should fail login with invalid email', async function () {
      const loginData = {
        email: 'invalid.email@example.com',
        password: 'password123',
      };

      const resp = await globalApi
        .post('/login')
        .send(loginData)
        .expect(401);

      expect(resp.body).to.have.property('error', 'Invalid email or password');
    });

    it('should fail login with invalid password', async function () {
      const loginData = {
        email: createdUser.email,
        password: 'wrongpassword',
      };

      const resp = await globalApi
        .post('/login')
        .send(loginData)
        .expect(401);

      expect(resp.body).to.have.property('error', 'Invalid email or password');
    });
  });
});
