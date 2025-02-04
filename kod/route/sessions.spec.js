const { expect } = require('chai');
const { createTestUser } = require('../testUser');
const sessionsRepo = require('../repo/sessions');
const usersRepo = require('../repo/users');

let token;
let testTrainer;
let createdSession;

before(async function () {
  token = await createTestUser('john.doe3@example.com','admin' ); 
});

describe('Sessions Routes', function () {
  before(async function () {
    testTrainer = await usersRepo.create({
      name: 'Test Trainer',
      email: `testtrainer_${Date.now()}@example.com`,
      password: 'password123',
      role: 'trainer',
    });
  });

  describe('POST /sessions', function () {
    it('should create a new session', async function () {
      const newSession = {
        name: 'Yoga Class',
        trainer_id: testTrainer.id,
        date_time: new Date().toISOString(),
        capacity: 20,
      };

      const resp = await global.api
        .post('/sessions')
        .set('Authorization', `Bearer ${token}`)
        .send(newSession)
        .expect(201);

      expect(resp.body).to.include.keys(['id', 'name', 'trainer_id', 'date_time', 'capacity']);
      expect(resp.body.name).to.equal(newSession.name);
      createdSession = resp.body; 
    });

    it('should return 500 if required fields are missing', async function () {
      const invalidSession = {
        name: 'Missing trainer ID',
        date_time: new Date().toISOString(),
        capacity: 20,
      };

      await global.api
        .post('/sessions')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidSession)
        .expect(500);
    });
  });

  describe('GET /sessions', function () {
    it('should fetch all sessions', async function () {
      const resp = await global.api
        .get('/sessions')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(resp.body).to.be.an('array');
      if (resp.body.length > 0) {
        expect(resp.body[0]).to.include.keys(['id', 'name', 'trainer_id', 'date_time', 'capacity']);
      }
    });
  });

  describe('GET /sessions/:id', function () {
    it('should fetch session details by ID', async function () {
      const resp = await global.api
        .get(`/sessions/${createdSession.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(resp.body).to.include.keys(['id', 'name', 'trainer_id', 'date_time', 'capacity']);
      expect(resp.body.id).to.equal(createdSession.id);
    });

    it('should return 404 if session not found', async function () {
      await global.api
        .get('/sessions/9999') 
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PUT /sessions/:id', function () {
    it('should update a session', async function () {
      const updatedSession = {
        name: 'Advanced Yoga Class',
        capacity: 25,
      };

      const resp = await global.api
        .put(`/sessions/${createdSession.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedSession)
        .expect(200);

      expect(resp.body.name).to.equal(updatedSession.name);
      expect(resp.body.capacity).to.equal(updatedSession.capacity);
    });

    it('should return 404 if session not found', async function () {
      const updatedSession = { name: 'Nonexistent Session' };

      await global.api
        .put('/sessions/9999') 
        .set('Authorization', `Bearer ${token}`)
        .send(updatedSession)
        .expect(404);
    });
  });

  describe('DELETE /sessions/:id', function () {
    it('should delete a session', async function () {
      await global.api
        .delete(`/sessions/${createdSession.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);
    });

    it('should return 404 if session not found after deletion', async function () {
      await global.api
        .delete(`/sessions/${createdSession.id}`) 
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});
