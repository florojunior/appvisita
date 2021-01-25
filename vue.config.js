const fs = require("fs");
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
  /*devServer: {
    https: {
      key: fs.readFileSync("./certs/localhost-key.pem"),
      cert: fs.readFileSync("./certs/localhost.pem")
    }
  }*/
};
