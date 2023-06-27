// lib
const fs = require("fs");
const path = require("path");

// util
const { printOptions, initializeConfig } = require("./configure.js");

try {
  const defaults = require("./config.json");
}
catch (error) {
  initializeConfig();
  const defaults = require("./config.json");
}

const createComponent = () => {
  return;
  let {
    fileType = ".jsx",
    styling: styleType = "",
    autoCapitalize = false,
    root = "",
  } = defaults;

  args.forEach((arg) => {
    if (regexIn.test(arg)) {
      const dirName = arg.slice(3);
      const folderPath = path.join(__dirname + root, dirName);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      process.chdir(folderPath);
    } else if (regexRoot.test(arg)) {
      // handle
    } else if (args === "-indexify") {
      function getFolders(directory) {
        return fs
          .readdirSync(directory, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);
      }

      // Usage example
      const currentDirectory = "./"; // Specify the directory path

      const folders = getFolders(currentDirectory);
      console.log("Folders:", folders);
    } else
      switch (arg) {
        case "-ts":
          fileType = ".ts";
          break;
        case "-js":
          fileType = ".js";
          break;
        case "-jsx":
          fileType = ".jsx";
          break;
        case "-tsx":
          fileType = ".tsx";
          break;
        case "-scss":
          styleType = ".scss";
          break;
        case "-css":
          styleType = ".css";
          break;
        case "tailwind":
          styleType = "tailwind";
          break;
        default:
          writeComponent(arg, fileType, styleType, autoCapitalize);
          break;
      }
  });
};