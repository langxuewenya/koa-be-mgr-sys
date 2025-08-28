const dotenv = require("dotenv");

dotenv.config();

module.exports = { SERVER_HOST, SERVER_PORT, DB_PORT, DB_NAME, DB_PASSWORD } =
  process.env;
