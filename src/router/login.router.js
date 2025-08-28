const KoaRouter = require("@koa/router");
const loginMiddleware = require("../middleware/login.middleware");
const loginController = require("../controller/login.controller");

const loginRouter = new KoaRouter({ prefix: "/login" });

// 用户登录
loginRouter.post("/", loginMiddleware.verifyLogin, loginController.login);
// 登录验证
loginRouter.get("/verify", loginMiddleware.verifyAuth, loginController.verify);

module.exports = loginRouter;
