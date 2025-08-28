const userService = require("../service/user.service");

class userController {
  // 新建用户
  async addUser(ctx, next) {
    const user = ctx.request.body;
    const result = await userService.addUser(user);
    ctx.body = {
      code: 200,
      message: "创建用户成功",
      data: result,
    };
  }
}

module.exports = new userController();
