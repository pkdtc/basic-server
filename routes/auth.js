const Router = require("koa-router");
const jwt = require("jsonwebtoken");
const passport = require("koa-passport");
const { addUser, checkUser, getUser } = require("../model/user/user");
const router = new Router();

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  console.log("username", username, password);
  // 检查用户名和密码是否正确（这里为了方便，写死了username和password）
  const res = await checkUser(username, password);
  console.log("res", res);
  if (res && res.length) {
    const payload = { username };
    const token = jwt.sign(payload, "your_jwt_secret");
    ctx.body = { token };
  } else {
    ctx.status = 401;
    ctx.body = { error: "用户名或密码无效！" };
  }
});
router.post("/signup", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  console.log("username", username, password);
  if(!username) {
    ctx.body = {
      errorCode: 0,
      errorMessage: '用户名无效'
    }
    return
  }
  if(username.length > 10) {
    ctx.body = {
      errorCode: 0,
      errorMessage: '用户名无效'
    }
    return
  }
  const res = await getUser(username, password);
  console.log("res", res);
  if(!res || !res.length) {
    addUser(username, password);
  } else {
    ctx.body = {
      errorCode: 0,
      errorMessage: '用户名无效'
    }
  }
});
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  async (ctx, next) => {
    const user = ctx.state.user;
    // 检查用户是否存在
    if (!user) {
      ctx.status = 401;
      ctx.body = { error: "无效token！" };
      return;
    }

    // 检查用户是否有权访问资源
    if (user.role !== "admin") {
      ctx.status = 403;
      ctx.body = { error: "访问被拒绝！" };
      return;
    }

    ctx.body = { message: "通过！" };
  }
);

module.exports = router;
