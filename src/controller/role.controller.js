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
}

module.exports = new roleController();
