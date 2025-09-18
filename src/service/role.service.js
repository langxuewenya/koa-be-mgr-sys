const connection = require("../app/database");

class RoleService {
  // 新增角色
  async addRole(role) {
    const { name, remark } = role;
    const statement = "INSERT INTO `role` (name, remark) VALUES (?, ?);";
    const [result] = await connection.execute(statement, [name, remark]);
    return result;
  }

  // 修改角色
  async updateRole(role) {
    const { name, remark, id } = role;
    const statement = "UPDATE `role` SET name = ?, remark = ? WHERE id = ?;";
    const [result] = await connection.execute(statement, [name, remark, id]);
    return result;
  }

  // 删除角色
  async deleteRole(roleId) {
    const statement = "DELETE FROM `role` WHERE id = ?;";
    const [result] = await connection.execute(statement, [roleId]);
    return result;
  }

  // 查询某个角色信息
  async searchRoleById(roleId) {
    const statement = "SELECT * FROM `role` WHERE id = ?;";
    const [role] = await connection.execute(statement, [roleId]);
    return role;
  }

  // 查询角色对应的菜单
  async searchMenusByRoleId(roleId) {
    const statement = `SELECT m.id, m.parent_id, m.name, m.path, m.icon, m.type
     FROM menus m
     JOIN role_menu rm ON m.id = rm.menu_id
     WHERE rm.role_id = ?`;
    const [menus] = await connection.execute(statement, [roleId]);
    return menus;
  }

  // 查询角色列表
  async searchRoleList() {
    // 查询总条数
    const [total] = await connection.execute(
      `SELECT COUNT(*) AS total FROM role;`
    );
    const totalCount = total[0].total;
    // 查询列表数据
    const statement = "SELECT * FROM `role`;";
    const [roles] = await connection.execute(statement);
    return { totalCount, roles };
  }

  // 查询角色名称是否存在
  async findRoleByName(name, id) {
    const statement = "SELECT * FROM `role` WHERE name = ? AND id <> ?;";
    const [result] = await connection.execute(statement, [name, id]);
    return result;
  }
}

module.exports = new RoleService();
