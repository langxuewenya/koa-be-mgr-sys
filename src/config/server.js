const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  SERVER_HOST,
  SERVER_PORT,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_PASSWORD,
} = process.env;
