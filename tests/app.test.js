import request from 'supertest';
import app from '../src/app.js';

describe("Basic API Tests", () => {

    //Basic Get Request
    describe('Basic Get Request', () => {
        it('GET / Should return welcome message', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Welcome to the Checkaroo');
        });
    })

    //ROUTE TEST TO USERS
    describe('GET /api/v1/users', () => {
        it('should return a success flag and an array of users', async () => {
            const res = await request(app).get('/api/v1/users');
            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);

            if (res.body.data.length > 0) {
                const firstUser = res.body.data[0];
                expect(firstUser).toHaveProperty('id');
                expect(firstUser).toHaveProperty('email');
                expect(firstUser).toHaveProperty('firstName');
            }
        })
    });

    //ROUTE TEST TO TASKS
    describe('GET /api/v1/tasks', () => {
        it('should return a success flag and an array of tasks', async () => {
            const res = await request(app).get('/api/v1/tasks');
            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);

            if (res.body.data.length > 0) {
                const firstUser = res.body.data[0];
                expect(firstUser).toHaveProperty('id');
                expect(firstUser).toHaveProperty('title');
                expect(firstUser).toHaveProperty('description');
            }
        })
    });

});