import request from 'supertest';
import { expect } from 'chai';

import app from '../../src/index';
import User from '../../src/Models/User';

const req = request(app.listen());

describe('API', () => {
  const user = {
    email: 'user@example.com',
    password: '123123',
    name: 'User',
  };
  const { email } = user;

  beforeEach(async () => {
    await User.query().where('email', email).delete();
  });

  afterEach(async () => {
    await User.query().where('email', email).delete();
  });

  it('should return 200 for root route', async () => {
    await req.get('/')
      .expect(200);
  });

  it('should create new user on signup', async () => {
    await req.post('/auth/register')
      .send(user)
      .expect(201);

    const userInDb = await User.query().where('email', email).first();
    expect(userInDb).to.not.be.an('undefined');
    expect(userInDb.created_at).to.not.be.null;
    expect(userInDb.updated_at).to.not.be.null;
  });

  it('should not create another user with the same email', async () => {
    await req.post('/auth/register').send(user);

    await req.post('/auth/register')
      .send(user)
      .expect(400);
  });
});
