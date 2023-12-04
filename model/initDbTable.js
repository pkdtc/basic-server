const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let UserModel = {}

function initUserModel() {
  const userSchema = new Schema({
    userId: { type: Number, unique: true, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  userSchema.index({ userId: 1 }, { unique: true });
  let user = mongoose.model("User", userSchema);
  UserModel = user
}
function getUserModel() {
  return UserModel
}
function initFirstUser() {
  const newUser = new User({
    userId: 1, // 这里应该使用自动递增的方式生成唯一 ID
    username: "john_doe",
    password: "securepassword",
  });

  // 将用户保存到数据库
  newUser
    .save()
    .then((result) => {
      console.log("User saved successfully:", result);
    })
    .catch((error) => {
      console.error("Error saving user:", error);
    });
}
module.exports = {
  initFirstUser,
  initUserModel,
  getUserModel,
};
// 用户
