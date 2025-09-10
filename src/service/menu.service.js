const connection = require("../app/database");

class MenuService {
  // 查询菜单列表
  async searchMenuList(body) {
    const { name, type, currentPage, pageSize } = body;
    const createTimeSatrt = body.createTime?.[0];
    const createTimeEnd = body.createTime?.[1];
    const offset = (currentPage - 1) * pageSize;
    // 动态添加条件
    let baseSql = "";
    const params = [];
    if (name) {
      baseSql += " AND name LIKE CONCAT('%', ?, '%')";
      params.push(name);
    }
    if (type) {
      baseSql += " AND type = ?";
      params.push(type);
    }
    if (createTimeSatrt) {
      baseSql += " AND create_time >= ?";
      params.push(createTimeSatrt);
    }
    if (createTimeEnd) {
      baseSql += " AND create_time <= ?";
      params.push(createTimeEnd);
    }

    // 查询总条数
    const [total] = await connection.execute(
      `SELECT COUNT(*) AS total FROM menus WHERE 1 = 1 ${baseSql}`,
      params
    );
    const totalCount = total[0].total;

    // 查询分页数据
    baseSql += " ORDER BY create_time DESC LIMIT ?, ?;"; // 添加排序和分页
    params.push(String(offset), String(pageSize));
    const [menus] = await connection.execute(
      `SELECT * FROM menus WHERE 1 = 1 ${baseSql}`,
      params
    );
    return { totalCount, menus };
  }
  // 新增菜单
  async addMenu(menu) {
    const { name, type, path, parent_id, icon } = menu;
    const statement =
      "INSERT INTO `menus` (name, type, path, parent_id, icon) VALUES (?, ?, ?, ?, ?);";
    const [result] = await connection.execute(statement, [
      name,
      type,
      path,
      parent_id || null,
      icon,
    ]);
    return result;
  }
  // 修改菜单
  async updateMenu(menu) {
    const { name, type, path, parent_id, icon, id } = menu;
    const statement =
      "UPDATE `menus` SET name = ?, type = ?, path = ?, parent_id = ?, icon = ? WHERE id = ?;";
    const [result] = await connection.execute(statement, [
      name,
      type,
      path,
      parent_id || null,
      icon,
      id,
    ]);
    return result;
  }
  // 删除菜单
  async deleteMenu(menuId) {
    const statement = "DELETE FROM `menus` WHERE id = ?;";
    const [result] = await connection.execute(statement, [menuId]);
    return result;
  }
  // 查询菜单名称是否存在
  async findMenuByName(name, id) {
    const statement = "SELECT * FROM `menus` WHERE name = ? AND id <> ?;";
    const [result] = await connection.execute(statement, [name, id]);
    return result;
  }
  // 查询菜单路径是否存在
  async findMenuByPath(path, id) {
    const statement = "SELECT * FROM `menus` WHERE path = ? AND id <> ?;";
    const [result] = await connection.execute(statement, [path, id]);
    return result;
  }
  // 查询父级菜单
  async searchParentMenu() {
    const statement = "SELECT * FROM `menus` WHERE type = ?;";
    const [result] = await connection.execute(statement, ["1"]);
    return result;
  }
}

module.exports = new MenuService();
