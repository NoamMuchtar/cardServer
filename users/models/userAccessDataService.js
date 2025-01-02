const User = require("./mongodb/User");

const registerUser = async (newUser) => {
  try {
    let user = new User(newUser);
    user = await user.save();
    return user;
  } catch (error) {
    throw new Error("Mongoose " + error.message);
  }
};

const getUser = async (UserId) => {
  try {
    let user = await User.findById(UserId);
    return user;
  } catch (error) {
    throw new Error("Mongoose:" + error);
  }
};

module.exports = { registerUser, getUser };
