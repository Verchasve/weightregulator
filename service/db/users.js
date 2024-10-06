import { Schema, model } from "mongoose";

const UserSchema = new Schema({
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

const Users = model("Users", UserSchema);

export default Users;