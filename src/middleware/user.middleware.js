const userService = require("../service/user.service");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error");
const md5Encrypt = require("../utils/md5");

// 验证用户
const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  const users = await userService.findUserByUsername(username);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }
  await next();
};

// 密码加密存储
const encryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Encrypt(password);
  await next();
};

module.exports = {
  verifyUser,
  encryptPassword,
};
