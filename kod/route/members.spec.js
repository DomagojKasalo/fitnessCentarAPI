const { expect } = require('chai');
const { createTestUser } = require('../testUser');
//const usersRepo = require('../repo/users');
let token;

before(async function () {
  token = await createTestUser('john.doe1@example.com','admin'); 
});

describe('Members Routes', function () {
  let createdMember;

  describe('GET /members', function () {
    it('should fetch all members', async function () {
      const resp = await global.api
        .get('/members')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(resp.body).to.be.an('array');
      if (resp.body.length > 0) {
        expect(resp.body[0]).to.include.keys(['id', 'name', 'email', 'role']);
        expect(resp.body[0].role).to.equal('member');
      }
    });
  });

  describe('POST /members', function () {
    it('should create a new member', async function () {
      const newMember = {
        name: 'John Doe',
        email: `johndoe_${Date.now()}@example.com`,
        password: 'password123',
      };

      const resp = await global.api
        .post('/members')
        .set('Authorization', `Bearer ${token}`)
        .send(newMember)
        .expect(201);

      expect(resp.body).to.include.keys(['id', 'name', 'email', 'role']);
      expect(resp.body.role).to.equal('member');
      createdMember = resp.body; 
    });
  });

  describe('GET /members/:id', function () {
    it('should fetch a member by ID', async function () {
      const resp = await global.api
        .get(`/members/${createdMember.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(resp.body).to.deep.include({
        id: createdMember.id,
        name: createdMember.name,
        email: createdMember.email,
        role: 'member',
      });
    });

    it('should return 404 if member not found', async function () {
      await global.api
        .get('/members/999999') 
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PUT /members/:id', function () {
    it('should update a member', async function () {
      const updatedData = { name: 'John Updated', email: `updated_${Date.now()}@example.com` };

      const resp = await global.api
        .put(`/members/${createdMember.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData)
        .expect(200);

      expect(resp.body).to.deep.include({
        id: createdMember.id,
        name: updatedData.name,
        email: updatedData.email,
      });

      createdMember = resp.body; 
    });
  });

  describe('DELETE /members/:id', function () {
    it('should delete a member', async function () {
      await global.api
        .delete(`/members/${createdMember.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);
    });

    it('should return 404 if member is already deleted', async function () {
      await global.api
        .get(`/members/${createdMember.id}`) 
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    
    });
  });
});
