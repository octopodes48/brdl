const request = require('supertest');
const server = 'http://localhost:3000';

describe('Controllers', () => {

  describe('Create User', () => {
    const request = {
      query : {
        fullName: 'jest',
        clientUsername: 'jest',
        clientPassword: 'jest',
      }
    };

    it('responds with status code 200 and json data type', () => request(server)
      .get('/gainAccess')
      .expect(200)
      .expect('Content-Type', /application\/json/));

    it('should successfully create a new user', () => request(server)
      .get('/gainAccess')
      .expect(200)
      .then((res) => res.body)
    );
  });
});