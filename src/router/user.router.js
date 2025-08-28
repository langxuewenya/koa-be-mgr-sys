const KoaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const userMiddleware = require("../middleware/user.middleware");

// 创建路由对象
const userRouter = new KoaRouter({ prefix: "/user" });

// 新增用户
userRouter.post(
  "/",
  userMiddleware.verifyUser,
  userMiddleware.encryptPassword,
  userController.addUser
);

// 3. 导出路由
module.exports = userRouter;
