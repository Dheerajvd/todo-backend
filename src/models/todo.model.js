const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, "Please enter username"]
    },
    title: {
      type: String,
      required: [true, "Please enter username"]
    },
    content: {
      type: String,
      required: [true, "Please add email address"]
    },
    isCompleted: {
      type : Boolean,
      required: [true, "Please enter status of the account"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo-list", TodoSchema);
