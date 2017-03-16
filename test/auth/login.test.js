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
  const { email, password } = user;

  before(async () => {
    await User.query().insert(user);
  });

  after(async () => {
    await User.query().where({ email }).delete();
  });

  it('does not authenticate user with wrong credentials', async () => {
    await req.post('/auth/login')
      .send({
        email: 'random@email.com',
        password: 'fakePassword',
      })
      .expect(400);
  });

  it('authenticates user with correct credentials', async () => {
    await req.post('/auth/login')
      .send({ email, password })
      .expect(200);
  });

  it('successful authentication returns an access token', async () => {
    const result = await req.post('/auth/login')
      .send({ email, password })
      .expect(200);

    expect(result.body.accessToken).to.not.be.an('undefined');
  });
});
