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

  // 查询某个用户
  async searchUserById(ctx, next) {
    const { userId } = ctx.params;
    const result = await userService.searchUserInfoById(userId);
    const { id, username, real_name, cellphone } = result[0];
    ctx.body = {
      code: 200,
      message: "查询成功",
      data: { id, username, realName: real_name, cellphone },
    };
  }
}

module.exports = new userController();
