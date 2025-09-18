-- 创建用户表
CREATE TABLE IF NOT EXISTS `user`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  real_name VARCHAR(30),
  cellphone VARCHAR(50),
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- user表增加avatar_url（头像图片url）字段
ALTER TABLE user ADD avatar_url VARCHAR(200);

-- user表增加role_id（角色id）字段
ALTER TABLE user ADD role_id INT;

-- 创建头像信息表
-- CREATE TABLE IF NOT EXISTS `avatar`(
--   id INT PRIMARY KEY AUTO_INCREMENT, 
--   filename VARCHAR(255) NOT NULL UNIQUE,
--   mimetype VARCHAR(30),
--   size INT,
--   user_id INT,
--   create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

-- 创建菜单表
CREATE TABLE IF NOT EXISTS menus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL COMMENT '菜单名称',
  type ENUM('1', '2') NOT NULL COMMENT '菜单类型: 1-目录, 2-菜单',
  path VARCHAR(200) NOT NULL COMMENT '菜单路径',
  parent_id INT DEFAULT NULL COMMENT '父菜单ID',
  icon VARCHAR(50) DEFAULT '' COMMENT '菜单图标',
  order_num INT DEFAULT 0 COMMENT '排序号',
  enabled TINYINT(1) DEFAULT 1 COMMENT '是否启用',
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES menus(id) ON DELETE SET NULL,
  INDEX idx_type (type),
  INDEX idx_parent_id (parent_id),
  INDEX idx_enabled (enabled)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

-- 添加菜单表原始数据
INSERT INTO menus (name, type, path, parent_id, icon) VALUES 
('首页', 2, '/main/home', NULL, 'HomeFilled'),
('系统管理', 1, '/main/system', NULL, 'Setting'),
('用户管理', 2, '/main/system/user', 2, 'User'),
('角色管理', 2, '/main/system/role', 2, 'Postcard'),
('菜单管理', 2, '/main/system/menu', 2, 'Tickets');

-- 创建角色表
CREATE TABLE IF NOT EXISTS role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL COMMENT '角色名称',
  remark VARCHAR(500) COMMENT '备注',
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 插入角色数据
INSERT INTO role (name, role_key, remark) VALUES
('超级管理员', 'admin', '拥有所有权限'),
('普通用户', 'user', '普通用户权限'),
('访客', 'guest', '只读权限');

-- 创建用户角色关联表（多对多关系，如果用户可以有多个角色）
CREATE TABLE IF NOT EXISTS user_role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL COMMENT '用户ID',
  role_id INT NOT NULL COMMENT '角色ID',
  UNIQUE KEY uk_user_role (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

-- 插入用户角色表数据
INSERT INTO user_role (user_id, role_id) VALUES
(1, 1);  -- admin用户拥有超级管理员角色

-- 创建角色菜单关联表
CREATE TABLE IF NOT EXISTS role_menu (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_id INT NOT NULL,
  menu_id INT NOT NULL
);

-- 插入角色菜单关联数据
INSERT INTO role_menu (role_id, menu_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5);  -- 管理员拥有所有菜单