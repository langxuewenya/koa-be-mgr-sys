const menuService = require("../service/menu.service");
const { MENU_NAME_IS_EXISTS, MENU_PATH_IS_EXISTS } = require("../config/error");

// 验证菜单名称/菜单路径是否存在
const verifyMenu = async (ctx, next) => {
  const { name, path } = ctx.request.body;
  const menuNames = await menuService.findMenuByName(name);
  if (menuNames.length) {
    return ctx.app.emit("error", MENU_NAME_IS_EXISTS, ctx);
  }
  const menuPaths = await menuService.findMenuByPath(path);
  if (menuPaths.length) {
    return ctx.app.emit("error", MENU_PATH_IS_EXISTS, ctx);
  }
  await next();
};

module.exports = {
  verifyMenu,
};
