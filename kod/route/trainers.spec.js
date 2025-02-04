const { expect } = require('chai');
const { createTestUser } = require('../testUser');  
const usersRepo = require('../repo/users');

let token;  
let createdTrainer; 

before(async function () {
  token = await createTestUser('john.doe4@example.com','admin'); 
});

describe('Trainers Routes', function () {
  describe('POST /trainers', function () {
    it('should create a new trainer', async function () {
      const newTrainer = {
        name: 'John Doe',
        email: `johndoe_${Date.now()}@example.com`,
        password: 'password123',
      };

      const resp = await global.api
        .post('/trainers')
        .set('Authorization', `Bearer ${token}`)
        .send(newTrainer)
        .expect(201);

      expect(resp.body).to.include.keys(['id', 'name', 'email', 'role']);
      expect(resp.body.name).to.equal(newTrainer.name);
      createdTrainer = resp.body;  
    });

    it('should return 500 if required fields are missing', async function () {
      const invalidTrainer = { name: 'Invalid Trainer' };

      await global.api
        .post('/trainers')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidTrainer)
        .expect(500);
    });
  });

  describe('GET /trainers', function () {
    it('should fetch all trainers', async function () {
      const resp = await global.api
        .get('/trainers')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(resp.body).to.be.an('array');
      if (resp.body.length > 0) {
        expect(resp.body[0]).to.include.keys(['id', 'name', 'email', 'role']);
      }
    });
  });

  describe('GET /trainers/:id', function () {
    it('should fetch trainer details by ID', async function () {
      const resp = await global.api
        .get(`/trainers/${createdTrainer.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(resp.body).to.include.keys(['id', 'name', 'email', 'role']);
      expect(resp.body.id).to.equal(createdTrainer.id);
    });

    it('should return 404 if trainer not found', async function () {
      await global.api
        .get('/trainers/9999')  
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PUT /trainers/:id', function () {
    it('should update trainer details', async function () {
      const updatedTrainer = { name: 'Updated Trainer Name' };

      const resp = await global.api
        .put(`/trainers/${createdTrainer.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedTrainer)
        .expect(200);

      expect(resp.body.name).to.equal(updatedTrainer.name);
    });

    it('should return 404 if trainer not found', async function () {
      const updatedTrainer = { name: 'Nonexistent Trainer' };

      await global.api
        .put('/trainers/9999')  
        .set('Authorization', `Bearer ${token}`)
        .send(updatedTrainer)
        .expect(404);
    });
  });

  describe('DELETE /trainers/:id', function () {
    it('should delete a trainer', async function () {
      await global.api
        .delete(`/trainers/${createdTrainer.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);
    });

    it('should return 404 if trainer not found after deletion', async function () {
      await global.api
        .delete(`/trainers/${createdTrainer.id}`)  
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});
