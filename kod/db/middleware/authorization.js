const roleCheck = (allowedRoles) => {
  return async (ctx, next) => {
    const userRole = ctx.state.user?.role;
    if (!allowedRoles.includes(userRole)) {
      ctx.status = 403;
      ctx.body = { error: 'Access denied' };
      return;
    }
    await next();
  };
};

module.exports = {
  roleCheck,
};
