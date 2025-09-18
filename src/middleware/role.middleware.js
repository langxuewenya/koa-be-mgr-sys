const roleService = require("../service/role.service");
const { ROLE_NAME_IS_EXISTS } = require("../config/error");

// 验证角色是否存在
const verifyRole = async (ctx, next) => {
  const { name, id } = ctx.request.body;
  const roleName = await roleService.findRoleByName(name, id || "");
  if (roleName.length) {
    return ctx.app.emit("error", ROLE_NAME_IS_EXISTS, ctx);
  }
  await next();
};

module.exports = {
  verifyRole,
};
