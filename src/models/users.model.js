const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"]
    },
    email: {
      type: String,
      required: [true, "Please add email address"],
      unique: [true, "Email adress is already in use"]
    },
    password: {
      type: String,
      required: [true, "Please add a password"]
    },
    role:{
      type: Number,
      required: [true, "Please enter a roleId"]
    },
    isBlocked: {
      type : Boolean,
      required: [true, "Please enter status of the account"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
