const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/screct");

class loginController {
  // 用户登录
  login(ctx, next) {
    // 获取用户信息
    const { id, username } = ctx.user;
    // 颁发令牌token
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: "7d",
      algorithm: "RS256",
    });
    // 返回用户信息
    ctx.body = {
      code: 200,
      message: "登录成功",
      data: { token, id, username },
    };
  }

  // 验证登录
  verify(ctx, next) {
    ctx.body = {
      code: 200,
      message: "测试接口成功",
    };
  }
}

module.exports = new loginController();
