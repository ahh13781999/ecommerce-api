const { connect } = require("mongoose");

const connectDB = (url) => {
  return connect(url);
};

module.exports = connectDB;
