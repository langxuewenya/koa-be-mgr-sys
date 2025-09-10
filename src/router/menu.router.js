const KoaRouter = require("@koa/router");
const menuController = require("../controller/menu.controller");
const loginMiddleware = require("../middleware/login.middleware");
const menuMiddleware = require("../middleware/menu.middleware");

const menuRouter = new KoaRouter({ prefix: "/menu" });

// 查询菜单列表
menuRouter.post(
  "/list",
  loginMiddleware.verifyAuth,
  menuController.searcMenuList
);

// 新增菜单
menuRouter.post(
  "/",
  loginMiddleware.verifyAuth,
  menuMiddleware.verifyMenu,
  menuController.addMenu
);

// 修改菜单
menuRouter.patch(
  "/",
  loginMiddleware.verifyAuth,
  menuMiddleware.verifyMenu,
  menuController.updateMenu
);

// 删除菜单
menuRouter.delete(
  "/:menuId",
  loginMiddleware.verifyAuth,
  menuController.deleteMenu
);

// 查询父级菜单
menuRouter.get(
  "/parent",
  loginMiddleware.verifyAuth,
  menuController.searchParentMenu
);

module.exports = menuRouter;
