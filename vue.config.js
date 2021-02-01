const fs = require("fs");
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
  devServer:{
    https: {
      key: fs.readFileSync("./certs/localhost-key.pem"),
      cert: fs.readFileSync("./certs/localhost.pem")
    },
    publicPath: '/',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};
