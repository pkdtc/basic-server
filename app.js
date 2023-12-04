const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");
const jwtConfig = require("./config/passport");
const authRoutes = require("./routes/auth");
const { initDb } = require("./model/db.js");
const app = new Koa();

app.use(bodyParser());
app.use(passport.initialize());
jwtConfig(passport);
app.use(authRoutes.routes());
initDb();
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
