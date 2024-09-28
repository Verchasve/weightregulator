const mongoose = require("mongoose");
mongoose.set('strictQuery', false); // or true to suppress the warning
const UserSchema = new mongoose.Schema({
  Fname: {
    type: String,
    required: false,
  },
  Lname: {
    type: String,
    required: false,
  },
  Email: {
    type: String,
    required: false,
  },
  Phone: {
    type: String,
    required: false,
  },
},
  { collection: "Users" }

);

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;