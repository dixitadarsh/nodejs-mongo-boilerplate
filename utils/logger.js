const colors=require("colors");
const log = console.log;
const moment = require('moment');
const loggerInfo = (msg, label) => {
  const timestamp = Date.now();
  log(
    colors.bgMagenta(`[${moment(timestamp).format("YYYY/MM/DD hh:mm:ss A")}]`),
    colors.bgGreen("[INFO]"),
    colors.yellow(`[${label}]`),
    
    ":",
    msg
  );
};
const loggerError = (msg, label) => {
  const timestamp = Date.now();
  log(
    colors.bgMagenta(`[${moment(timestamp).format("YYYY/MM/DD hh:mm:ss A")}]`),
    colors.bgRed("[ERROR]"),
    colors.yellow(`[${label}]`),
    
    ":",
    msg
  );
};

module.exports = { loggerInfo,loggerError };
