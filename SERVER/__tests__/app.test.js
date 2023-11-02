const app = require('../app');
const request = require('supertest');
const { prismaMock } = require('../../mocks/prismaMock');


describe('GET /api/users', () => {
    it('returns the list of all users', async () => {
        const users = [
            {id: 1, username: "mar", name: "mar", location:"here", active: true},
        ];

        prismaMock.user.findMany.mockResolvedValue(users);

        const response = await request(app).get('/api/users');
        console.log(response.body.users, "response")
        
        expect(response.body.users[0]).toEqual(users[0]);

    })
});

describe('POST /api/users/register', () => {
    it("creates a new user", async () => {
        const users = [
            {id:1, username: "newUser", password: "password"}
        ];

        prismaMock.user.create.mockResolvedValue(users);


        const response = await request(app).post('/api/users/register');
        
        expect(response.body.users[0]).toEqual(users[0]);
    })
});

describe('POST /api/users/login', () => {
    it("logs an existing user", async () => {
        const users = [
            {id:1, username: "newUser", password: "password"}
        ];

        prismaMock.user.post.mockResolvedValue(users);


        const response = await request(app).post('/api/users/login');
        
        expect(response.body.users[0]).toEqual(users[0]);
    })
});


describe('POST /api/users/posts', () => {
    it('creates a new post', async () => {
        const NewPost = {
            id: 1,
            authorId: 2,
            title: "Hello",
            content: "My Content",
            active: true
        };

        prismaMock.post.create.mockResolvedValue(post);

        const response = await request(app).post('/api/users/post');

        const {post} = response.body;
        
        expect(post.id).toEqual(NewPost.id);
        expect(post.authorId).toEqual(NewPost.authorId);
        expect(post.title).toEqual(NewPost.title);
        expect(post.content).toEqual(NewPost.content);
        expect(post.active).toEqual(true);

        expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
    });
})
