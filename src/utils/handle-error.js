const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
} = require("../config/error");

app.on("error", (error, ctx) => {
  let code = 400;
  let message = "";
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      message = "用户名或密码不能为空";
      break;
    case NAME_IS_ALREADY_EXISTS:
      message = "用户名已经被占用，请输入新的用户名";
      break;
    case NAME_IS_NOT_EXISTS:
      message = "用户不存在，请检查用户名";
      break;
    case PASSWORD_IS_INCORRENT:
      message = "密码错误，请检查密码";
      break;
    case UNAUTHORIZATION:
      message = "无效的token或token已过期";
      break;
  }
  ctx.body = { code, message };
});
