const request = require('supertest');
const fs = require('fs');
const path = require('path');
const { assert } = require('console');
const { nextTick } = require('process');
const server = 'http://localhost:3000';
const db = require('../server/models/brdlModels');


describe('Controllers', () => {
  const query = {
    fullName: 'jest',
    clientUsername: 'jest',
    clientPassword: 'jest',
  };

  afterAll(() => {
    const deleteUser = 'DELETE FROM Users WHERE username=\'jest\'';
    db.query(deleteUser)
      .catch((err))
  });
  
  describe('Create User', () => {
    it('Create user responds with status code 200 and json data type', () => request(server)
      .get(`/gainAccess`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .catch((err) => { console.log(err) })
    );

    it('should successfully create a new user', () => request(server)
      .post('/gainAccess?fullName=jest&username=jest&password=jest')
      .expect(200)
      .then((res) => expect(res.body).toEqual({ valid: true }))
      .catch((err) => { console.log(err) })
    );

    it('should return false if user already exists', () => request(server)
      .post('/gainAccess?fullName=jest&username=jest&password=jest')
      .expect(200)
      .then((res) => expect(res.body).toEqual({ valid: false }))
      .catch((err) => { console.log(err) })
    );
  });

  describe('Authorize User responds with status code 200 and json data type', () => {
    it('responds with status code 200 and json data type', () => request(server)
      .get('/gainAccess?fullName=jest&username=jest&password=jest')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .catch((err) => { console.log(err) })
    );

    it('should successfully authorize a user', () => request(server)
      .get('/gainAccess?fullName=jest&username=jest&password=jest')
      .send(query)
      .expect(200)
      .then((res) => expect(res.body.valid).toEqual(true))
      .catch((err) => { console.log(err) })
    );

    it('should fail to authorize a non-existant user', () => request(server)
      .get('/gainAccess?fullName=jest&username=noJest&password=jest')
      .send(query)
      .expect(200)
      .then((res) => expect(res.body.valid).toEqual(false))
      .catch((err) => { console.log(err) })
  );
  });
});