const userService = require("../service/user.service");
const roleService = require("../service/role.service");

class userController {
  // 新建用户
  async addUser(ctx, next) {
    const user = ctx.request.body;
    const result = await userService.addUser(user);
    ctx.body = {
      code: 200,
      message: "success",
    };
  }

  // 修改用户
  async updateUser(ctx, next) {
    const user = ctx.request.body;
    const result = await userService.updateUser(user);
    ctx.body = {
      code: 200,
      message: "success",
    };
  }

  // 删除用户
  async deleteUser(ctx, next) {
    const { userId } = ctx.params;
    const result = await userService.deleteUser(userId);
    ctx.body = {
      code: 200,
      message: "success",
    };
  }

  // 查询某个用户
  async searchUserById(ctx, next) {
    const { userId } = ctx.params;
    // 用户信息
    const [user] = await userService.searchUserInfoById(userId);
    const { id, username, real_name, cellphone, role_id } = user;
    // 角色信息
    const [role] = await roleService.searchRoleById(role_id);
    const roleRes = {
      id: role.id,
      name: role.name,
      key: role.role_key,
      remark: role.remark,
    };
    ctx.body = {
      code: 200,
      message: "success",
      data: { id, username, realName: real_name, cellphone, role: roleRes },
    };
  }

  // 查询用户列表
  async searchUserList(ctx, next) {
    const { totalCount, users } = await userService.searchUserList(
      ctx.request.body
    );
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        list: users,
        totalCount,
      },
    };
  }
}

module.exports = new userController();
