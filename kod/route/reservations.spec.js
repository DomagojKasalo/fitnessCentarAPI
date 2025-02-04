const { expect } = require('chai');
const { createTestUser } = require('../testUser');
const reservationsRepo = require('../repo/reservations');
const usersRepo = require('../repo/users');
const sessionsRepo = require('../repo/sessions');

let token;
let createdReservation;

before(async function () {
  token = await createTestUser('john.doe2@example.com','admin'); 
});

describe('Reservations Routes', function () {
  let testMember;
  let testSession;

  before(async function () {
    testMember = await usersRepo.create({
      name: 'Test Member',
      email: `testmember_${Date.now()}@example.com`,
      password: 'password123',
      role: 'member',
    });

    testSession = await sessionsRepo.create({
        name: 'Yoga Class',
        trainer_id: "1",
        date_time: new Date().toISOString(),
        capacity: 10,
    });
  });

  describe('GET /reservations', function () {
    it('should fetch all reservations', async function () {
      const resp = await global.api
        .get('/reservations')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(resp.body).to.be.an('array');
      if (resp.body.length > 0) {
        expect(resp.body[0]).to.include.keys(['id', 'member_id', 'session_id']);
      }
    });
  });

  describe('POST /reservations', function () {
    it('should create a new reservation', async function () {
      const newReservation = {
        member_id: testMember.id,
        session_id: testSession.id,
      };

      const resp = await global.api
        .post('/reservations')
        .set('Authorization', `Bearer ${token}`)
        .send(newReservation)
        .expect(201);

      expect(resp.body).to.include.keys(['id', 'member_id', 'session_id']);
      expect(resp.body.member_id).to.equal(newReservation.member_id);
      expect(resp.body.session_id).to.equal(newReservation.session_id);

      createdReservation = resp.body; 
    });

    it('should return 400 if reservation already exists', async function () {
      const duplicateReservation = {
        member_id: testMember.id,
        session_id: testSession.id,
      };

      const resp = await global.api
        .post('/reservations')
        .set('Authorization', `Bearer ${token}`)
        .send(duplicateReservation)
        .expect(400);

      expect(resp.body).to.have.property('error', 'Reservation already exists for this member and session');
    });
  });

  describe('DELETE /reservations/:id', function () {
    it('should delete a reservation', async function () {
      await global.api
        .delete(`/reservations/${createdReservation.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);
    });

    it('should return 404 if reservation is not found', async function () {
      await global.api
        .delete(`/reservations/${createdReservation.id}`) 
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});
