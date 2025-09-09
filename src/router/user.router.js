const KoaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const userMiddleware = require("../middleware/user.middleware");
const loginMiddleware = require("../middleware/login.middleware");

// 创建路由对象
const userRouter = new KoaRouter({ prefix: "/user" });

// 新增用户
userRouter.post(
  "/",
  userMiddleware.verifyUser,
  userMiddleware.encryptPassword,
  userController.addUser
);

// 修改用户
userRouter.patch(
  "/",
  loginMiddleware.verifyAuth,
  userMiddleware.verifyUser,
  userController.updateUser
);

// 删除用户
userRouter.delete(
  "/:userId",
  loginMiddleware.verifyAuth,
  userController.deleteUser
);

// 查询某个用户
userRouter.get(
  "/:userId",
  loginMiddleware.verifyAuth,
  userController.searchUserById
);

// 查询用户列表
userRouter.post(
  "/list",
  loginMiddleware.verifyAuth,
  userController.searchUserList
);

// 导出路由
module.exports = userRouter;
