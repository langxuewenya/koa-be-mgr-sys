const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registerRouteers = require("../router");
const cors = require("@koa/cors");

// 创建app
const app = new Koa();

// 对app使用中间件
app.use(bodyParser());

// 配置跨域，允许所有来源
app.use(cors());

// 动态注册路由对象
registerRouteers(app);

// 将app导出
module.exports = app;
