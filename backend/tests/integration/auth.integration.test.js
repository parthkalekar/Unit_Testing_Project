const request = require('supertest');
const app = require('../../app');
const { users } = require('../../controllers/authController');


beforeEach(() => { users.length = 0; });


describe('POST /api/auth/register', () => {
    test('creates a user with valid data', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'a@b.com', password: 'pass' });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered');
        expect(users.length).toBe(1);
    });


    test('returns 400 when missing fields', async () => {
        const res = await request(app).post('/api/auth/register').send({ email: 'x' });
        expect(res.statusCode).toBe(400);
    });
});