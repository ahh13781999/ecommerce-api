const { genSalt, hash, compare } = require("bcryptjs");
const validator = require("validator");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required!"],
  },
  email: {
    type: String,
    required: [true, "email is required!"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "password is required!"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  if(!this.isModified("password")) return;
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model("User", UserSchema);
