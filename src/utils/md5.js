const crypto = require("crypto");

// md5加密
function md5Encrypt(password) {
  const md5 = crypto.createHash("md5");
  return md5.update(password).digest("hex");
}

module.exports = md5Encrypt;
