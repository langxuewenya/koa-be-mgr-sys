const KoaRouter = require("@koa/router");
const loginMiddleware = require("../middleware/login.middleware");
const roleController = require("../controller/role.controller");

const roledRouter = new KoaRouter({ prefix: "/role" });

// 查询角色菜单树
roledRouter.get(
  "/:roleId/menu",
  loginMiddleware.verifyAuth,
  roleController.searcMenusTreeByRoleId
);

// 查询角色列表
roledRouter.post(
  "/list",
  loginMiddleware.verifyAuth,
  roleController.searcMenuList
);

module.exports = roledRouter;
