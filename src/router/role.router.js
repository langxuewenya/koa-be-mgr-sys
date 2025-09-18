const KoaRouter = require("@koa/router");
const loginMiddleware = require("../middleware/login.middleware");
const roleMiddleware = require("../middleware/role.middleware");
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
  roleController.searcRoleList
);

// 新增角色
roledRouter.post(
  "/",
  loginMiddleware.verifyAuth,
  roleMiddleware.verifyRole,
  roleController.addRole
);

// 修改角色
roledRouter.patch(
  "/",
  loginMiddleware.verifyAuth,
  roleMiddleware.verifyRole,
  roleController.updateRole
);

// 删除角色
roledRouter.delete(
  "/:roleId",
  loginMiddleware.verifyAuth,
  roleController.deleteRole
);

module.exports = roledRouter;
