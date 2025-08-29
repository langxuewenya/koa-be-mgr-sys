// 把扁平菜单数组转为菜单树
function buildMenuTree(menuList, parentId = 0) {
  return menuList
    .filter((menu) => menu.parent_id === parentId)
    .map((menu) => ({
      ...menu,
      children: buildMenuTree(menuList, menu.id),
    }));
}

module.exports = { buildMenuTree };
