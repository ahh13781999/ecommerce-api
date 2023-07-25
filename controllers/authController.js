const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse, createPayload } = require("../utils");
const User = require("../models/User");
const { BadRequestError, NotFoundError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists!");
  }

  // FIRST REGISTERED USER IS AN ADMIN
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ?? "admin";

  const user = await User.create({ name, email, password, role });
  attachCookiesToResponse({ res, user });
  res.status(StatusCodes.CREATED).json({ user: createPayload({ user }) });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("Wrong email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new NotFoundError("Wrong email or password");
  }

  attachCookiesToResponse({ res, user });

  res.status(StatusCodes.OK).json({ user: createPayload({ user }) });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now() + 3 * 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};

module.exports = {
  register,
  login,
  logout,
};
