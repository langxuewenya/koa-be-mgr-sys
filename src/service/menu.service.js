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
}

module.exports = new MenuService();
