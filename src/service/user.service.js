const connection = require("../app/database");

class UserService {
  // 新增用户
  async addUser(user) {
    const { username, password, real_name, cellphone, role_id } = user;
    const statement =
      "INSERT INTO `user` (username, password, real_name, cellphone, role_id) VALUES (?, ?, ?, ?, ?);";
    const [result] = await connection.execute(statement, [
      username,
      password,
      real_name,
      cellphone,
      role_id,
    ]);
    return result;
  }
  // 修改用户
  async updateUser(user) {
    const { username, real_name, cellphone, role_id, id } = user;
    const statement =
      "UPDATE `user` SET username = ?, real_name = ?, cellphone = ?, role_id = ? WHERE id = ?;";
    const [result] = await connection.execute(statement, [
      username,
      real_name,
      cellphone,
      role_id,
      id,
    ]);
    return result;
  }
  // 删除用户
  async deleteUser(userId) {
    const statement = "DELETE FROM `user` WHERE id = ?;";
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }
  // 查询用户是否存在
  async findUserByUsername(username) {
    const statement = "SELECT * FROM `user` WHERE username = ?;";
    const [values] = await connection.execute(statement, [username]);
    return values;
  }
  // 查询某个用户信息
  async searchUserInfoById(userId) {
    const statement = "SELECT * FROM `user` WHERE id = ?;";
    const [values] = await connection.execute(statement, [userId]);
    return values;
  }
  // 查询用户列表
  async searchUserList(body) {
    const { username, cellphone, role_id, currentPage, pageSize } = body;
    const createTimeSatrt = body.createTime?.[0];
    const createTimeEnd = body.createTime?.[1];
    const offset = (currentPage - 1) * pageSize;
    // 动态添加条件
    let baseSql = "";
    const params = [];
    if (username) {
      baseSql += " AND username LIKE CONCAT('%', ?, '%')";
      params.push(username);
    }
    if (cellphone) {
      baseSql += " AND cellphone LIKE CONCAT('%', ?, '%')";
      params.push(cellphone);
    }
    if (role_id) {
      baseSql += " AND role_id = ?";
      params.push(role_id);
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
      `SELECT COUNT(*) AS total FROM user WHERE 1 = 1 ${baseSql}`,
      params
    );
    const totalCount = total[0].total;

    // 查询分页数据
    baseSql += " ORDER BY create_time DESC LIMIT ?, ?;"; // 添加排序和分页
    params.push(String(offset), String(pageSize));
    const [users] = await connection.execute(
      `SELECT * FROM user WHERE 1 = 1 ${baseSql}`,
      params
    );
    return { totalCount, users };
  }
}

module.exports = new UserService();
