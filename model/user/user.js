const mongoose = require("mongoose");
const { getUserModel } = require("../initDbTable");
const getUser = async (name, password) => {
  const User = getUserModel()
  console.log('check', name)
  return User.find({ username: name })
    .then((users) => {
      console.log("Users found:", users);
      return users
    })
    .catch((error) => {
      console.error("Error finding users:", error);
    });
};
const checkUser = async (name, password) => {
  const User = getUserModel()
  console.log('check', name)
  return User.find({ username: name , password: password })
    .then((users) => {
      console.log("Users found:", users);
      return users
    })
    .catch((error) => {
      console.error("Error finding users:", error);
    });
};
const addUser = async (name, password) => {
  const User = getUserModel()
  const newUser = new User({
    userId: 2, // 这里应该使用自动递增的方式生成唯一 ID
    username: name,
    password: password,
  });

  // 将用户保存到数据库
  return newUser
    .save()
    .then((result) => {
      console.log("User saved successfully:", result);
    })
    .catch((error) => {
      console.error("Error saving user:", error);
    });
};
module.exports = {
  addUser,
  checkUser,
  getUser
};
