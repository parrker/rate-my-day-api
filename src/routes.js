import User from './Models/User';

export const publicRoutes = (router) => {
  router.get('/', async ctx => {
    return ctx.ok({ message: 'Hello' });
  });

  router.post('/auth/register', async ctx => {
    const { email, password, name } = ctx.request.body;

    try {
      await User.query().insert({ email, password, name });
    } catch (e) {
      return ctx.badRequest({ message: e });
    }

    return ctx.created({ message: 'Created' });
  });

  router.post('/auth/login', async ctx => {
    const { email, password } = ctx.request.body;

    const user = await User.query().where({ email, password }).first();

    if (user) {
      const accessToken = user.authenticate();

      return ctx.ok({ ...user, accessToken });
    }

    return ctx.badRequest({ message: 'Incorrect combination of email and password.' });
  });

  return router.routes();
};

export const privateRoutes = (router) => {
  return router.routes();
};
