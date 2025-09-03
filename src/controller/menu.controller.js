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
}

module.exports = new menuController();
