const menuService = require("../service/menu.service");

class menuController {
  // 查询菜单列表
  async searcMenuList(ctx, next) {
    let { totalCount, menus } = await menuService.searchMenuList(
      ctx.request.body
    );
    ctx.body = {
      code: 200,
      message: "success",
      data: {
        list: menus,
        totalCount,
      },
    };
  }
  // 新增菜单
  async addMenu(ctx, next) {
    const menu = ctx.request.body;
    const result = await menuService.addMenu(menu);
    ctx.body = {
      code: 200,
      message: "success",
    };
  }
  // 修改菜单
  async updateMenu(ctx, next) {
    const menu = ctx.request.body;
    const result = await menuService.updateMenu(menu);
    ctx.body = {
      code: 200,
      message: "success",
    };
  }
  // 删除菜单
  async deleteMenu(ctx, next) {
    const { menuId } = ctx.params;
    const result = await menuService.deleteMenu(menuId);
    ctx.body = {
      code: 200,
      message: "success",
    };
  }
  // 查询父级菜单
  async searchParentMenu(ctx, next) {
    const menus = await menuService.searchParentMenu();
    ctx.body = {
      code: 200,
      message: "success",
      data: menus,
    };
  }
}

module.exports = new menuController();
