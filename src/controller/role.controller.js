const roleService = require("../service/role.service");
const { buildMenuTree } = require("../utils/tool");

class roleController {
  // 查询角色对应的菜单树
  async searcMenusTreeByRoleId(ctx, next) {
    const { roleId } = ctx.params;
    let menusList = await roleService.searchMenusByRoleId(roleId);
    menusList = menusList.map((menu) => {
      return {
        ...menu,
        parent_id: menu.parent_id === null ? 0 : menu.parent_id, // 给一级菜单设置parent_id
      };
    });
    // 将扁平菜单转化为树
    const menusTree = buildMenuTree(menusList);
    ctx.body = {
      code: 200,
      message: "success",
      data: menusTree,
    };
  }
  // 查询角色列表
  async searcRoleList(ctx, next) {
    const { totalCount, roles } = await roleService.searchRoleList();
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        list: roles,
        totalCount,
      },
    };
  }
  // 新增角色
  async addRole(ctx, next) {
    const role = ctx.request.body;
    const result = await roleService.addRole(role);
    ctx.body = {
      code: 200,
      message: "success",
    };
  }
  // 修改角色
  async updateRole(ctx, next) {
    const role = ctx.request.body;
    const result = await roleService.updateRole(role);
    ctx.body = {
      code: 200,
      message: "success",
    };
  }
  // 删除角色
  async deleteRole(ctx, next) {
    const { roleId } = ctx.params;
    const result = await roleService.deleteRole(roleId);
    ctx.body = {
      code: 200,
      message: "success",
    };
  }
}

module.exports = new roleController();
