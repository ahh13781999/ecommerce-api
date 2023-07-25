const { verify, sign } = require("jsonwebtoken");

const createPayload = ({ user }) => {
  const payload = {
    userId: user._id,
    name: user.name,
    role: user.role,
  };
  return payload;
};

const createJWT = ({ payload }) => {
  const token = sign(payload, process.env.JET_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const payload = createPayload(user);

  const token = createJWT(payload);

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createPayload,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
