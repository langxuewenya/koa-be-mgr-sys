const connection = require("../app/database");

class RoleService {
  // 新增角色

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
}

module.exports = new RoleService();
