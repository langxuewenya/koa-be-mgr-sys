const connection = require("../app/database");

class UserService {
  // 新增用户
  async addUser(user) {
    const { username, password } = user;
    const statement = "INSERT INTO `user` (username, password) VALUES (?, ?);";
    const [result] = await connection.execute(statement, [username, password]);
    return result;
  }
  // 查询用户是否存在
  async findUserByUsername(username) {
    const statement = "SELECT * FROM `user` WHERE username = ?;";
    const [values] = await connection.execute(statement, [username]);
    return values;
  }
}

module.exports = new UserService();
