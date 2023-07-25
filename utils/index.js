const checkPermissions = require('./checkPermissions');
const {
  createJWT,
  createPayload,
  isTokenValid,
  attachCookiesToResponse,
} = require("./jwt");


module.exports = {
  createJWT,
  createPayload,
  isTokenValid,
  attachCookiesToResponse,
  checkPermissions
};
