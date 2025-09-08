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
}

module.exports = new menuController();
