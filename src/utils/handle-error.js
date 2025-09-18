const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  MENU_NAME_IS_EXISTS,
  MENU_PATH_IS_EXISTS,
  ROLE_NAME_IS_EXISTS,
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
    case MENU_NAME_IS_EXISTS:
      message = "菜单名称已经存在，请输入新的菜单名称";
      break;
    case MENU_PATH_IS_EXISTS:
      message = "菜单路径已经存在，请输入新的菜单路径";
      break;
    case ROLE_NAME_IS_EXISTS:
      message = "角色名称已经存在，请输入新的角色名称";
      break;
  }
  ctx.body = { code, message };
});
