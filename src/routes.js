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

  return router.routes();
};

export const privateRoutes = (router) => {
  return router.routes();
};
