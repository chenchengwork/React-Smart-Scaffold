'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.post('/api/auth/login', 'auth.login');
  router.post('/api/auth/register', 'auth.register');
  router.resources('users', '/api/users', controller.user);
};
