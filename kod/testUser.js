const userRepo = require('./repo/users');
const jwt = require('jsonwebtoken');

async function createTestUser(email,role) {
    const korisnik = {
        name: 'John Doe',
        email: email,
        password: 'password123',
        role: role ,
    }
    const user = await userRepo.create(korisnik)
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

module.exports = { createTestUser }