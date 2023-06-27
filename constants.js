const regexIn = /^in:\S*$/;
const regexRoot = /^root:\S*$/;
const defaultConfig = {
  filetype: ".jsx",
  styling: ".scss",
  autoCapitalize: true,
  root: "\\src",
};
const configFile = "config.json"

exports.regexIn = regexIn;
exports.regexRoot = regexRoot;
exports.defaultConfig = defaultConfig;
exports.configFile = configFile;
