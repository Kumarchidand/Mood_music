const mongoose = require('mongoose');

// ✅ Correct schema structure
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// ✅ Correct way to register model: first argument is model name (string), second is schema
const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
