const app = require('../app');
const request = require('supertest');
const { prismaMock } = require('../../mocks/prismaMock');


describe('GET /api/users', () => {
    it('returns the list of all users', async () => {
        const users = [
            {"id": 1, "username": "mar", "name": "mar", "location":"here", "active": true},
        ];

        prismaMock.user.findMany.mockResolvedValue(users);

        const response = await request(app).get('/api/users');

        expect(response.body[0]).toEqual(users[0]);

        console.log(response.body)
    })
});

describe('GET /api/users/register', () => {
    it("creates a new user", async () => {
        const user = [
            {"id":1, "username": "newUser"}
        ]
    })
})


