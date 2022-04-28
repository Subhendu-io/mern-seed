const authService = require('../services/auth.service');

module.exports.authenticate = (routeRole) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token) {
        const tokenUser = await authService.authenticateToken(token, next);
        if (routeRole) {
          const isUser = await authService.authenticateRole(tokenUser, routeRole, next);
          if (isUser) {
            req.user = tokenUser;
            next();
          } else {
            return next({
              status  : 403,
              title   : 'Unauthorized User Role!',
              message : 'Sorry, we could authenticate user due to unauthorized user role.'
            });
          }
        } else {
          req.user = tokenUser;
          next();
        }
      } else {
        return next({
          status  : 401,
          title   : 'Unauthorized User Token!',
          message : 'Unauthorized Request. Token not fount'
        });
      }
    } catch (error) {
      return next(error);
    }
  };
};