const request = require('supertest');

const db = require('../database/dbConfig');
const server = require('../api/server');

describe('server', () => {
    //TESTS for registering
    describe('POST /api/auth/register', () => {
        beforeEach(async () => {
            await db('users').truncate(); //cleans out table before a test
        })
        //1
        it('returns a success', () => {
            return request(server)
              .post('/api/auth/register')
              .send({
                  username: 'testingboi',
                  password: 'passyboi'
              })
              .then(res => {
                  expect(res.status).toBe(201)
              })    
        })
        //2
        it('returns a success message', () => {
            return request(server)
              .post('/api/auth/register')
              .send({
                  username: 'testingboi',
                  password: 'passyboi'
              })
              .then(res => {
                  expect(res.body.success)
              })    
        });
    });
    //TESTING FOR LOGIN
    describe('POST /api/auth/login', () => {
        //1
        it('returns a success', () => {
            return request(server)
              .post('/api/auth/login')
              .send({
                username: 'testingboi',
                password: 'passyboi'
              })
              .then(res => {
                  expect(res.status).toBe(200)
              })
        });
        //2
        it('provides a token', () => {
            return request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testingboi',
                    password: 'passyboi'
                })
                .then(res => {
                    expect(res.body.token)
                })
        })
    });

    //TESTING FOR JOKES
    describe('GET /api/jokes', () => {
        it('gives us an array', () => {
            return request(server)
              .get('/api/jokes')
              .then(res => {
                expect(Array.isArray(res.body)).toBe(true)
              })
        })
    })
});