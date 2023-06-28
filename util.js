// lib
const fs = require("fs");
const path = require("path")

// constants
const {
  regexRoot,
  regexIn,
  configFile,
} = require("./constants.js");


// config
const { defaults } = require("./configure.js")

// content
const { generateContent, contentSass, contentIndex } = require("./content.js")

// ******************************************************************************************************************

// checks if file type is declared within input, then overrides defaults
const getFileType = (commands) => {
  let fileType = defaults.filetype;
  let styleType = defaults.styling;
  let fileNames = []
  exportOption = defaults.exportOption ?? "export"

  commands.forEach(item => {
    switch (item) {
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
      case "-tailwind":
        styleType = "tailwind";
        break;
      case "-e":
        exportOption = "export";
        break;
      case "-ed":
        exportOption = "exportDefault"
        break;
      default:
        if (!item.startsWith('-') && !item.includes(":"))
          fileNames.push(item)
        break;
    }
  })
  return { fileNames, fileType, styleType, autoCapitalize: defaults.autoCapitalize, exportOption };
};

// checks if config file exists
const configFileExists = () => {
  const filePath = path.join(process.cwd(), configFile);
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

// checks if directory is declared
const handleDirectorySpecified = (args) => {
  const newRoot = args.find(arg => regexIn.test(arg))
  if (newRoot) {
    const dirName = newRoot.slice(3);
    let folderPath;
    try {
      folderPath = path.join(process.cwd() + defaults.root, dirName);
    } catch (error) {
      console.log("\x1b[31m", "- Error while generating components:", error);
      return;
    }
    if (!fs.existsSync(folderPath)) {
      try {
        fs.mkdirSync(folderPath);
        console.log("\x1b[32m", '> Directory created successfully.');
      } catch (error) {
        console.log("\x1b[31m", '- An error occurred while creating the directory: ENOENT: no such file or directory');
        throw error
      }
    }
    try {
      process.chdir(folderPath);
    }
    catch (error) {
      console.log("- Error!")
      throw error
    }
  }
  return null
};




// checks if indexify is enabled
const isIndexifyEnable = (commands) => {
  return commands.some(item => item === "-indexify");
};

// create directory
const createDirectory = (dirName) => {
  try {
    fs.mkdir(`${process.cwd()}/${dirName}`, () => { });
  }
  catch (error) {
    console.log("\x1b[31m", "- Cannot create directory!")
  }
};

// writes a component with directory and styling
const writeComponent = (
  fileName = "",
  fileType = "",
  styleType = "",
  autoCapitalize = "",
  exportOption = ""
) => {
  fileName = autoCapitalize
    ? fileName.charAt(0).toUpperCase() + fileName.slice(1)
    : fileName;

  console.log("\x1b[33m", `> Creating ${fileName}...`);

  createDirectory(fileName);

  fs.writeFileSync(
    `${process.cwd()}/${fileName}/${fileName}${fileType}`,
    generateContent(fileName, fileType, styleType, exportOption)
  );

  styleType && styleType !== "tailwind"
    ? fs.writeFileSync(
      `${process.cwd()}/${fileName}/${fileName}${styleType}`,
      contentSass(fileName)
    )
    : null;
  console.log("\x1b[32m", `> Created \x1b[34m<${fileName}/>\x1b[0m \x1b[32mcomponent!`);
};

const handleIndexify = (fileType, exportOption) => {
  const folderPath = process.cwd();
  console.log("\x1b[33m", "> Indexifying...");

  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("\x1b[31m", 'Error reading directory:', err);
      return;
    }
    const subdirectories = files
      .filter(file => file.isDirectory())
      .map(file => file.name);
    const fileName = `index${fileType === ".tsx" ? ".ts" : ".js"}`

    fs.writeFileSync(fileName, contentIndex(subdirectories, exportOption, fileType))
    console.log("\x1b[32m", `> Created \x1b[34m${fileName}\x1b[0m!`)

  });
}

exports.configFileExists = configFileExists
exports.isIndexifyEnable = isIndexifyEnable
exports.writeComponent = writeComponent
exports.handleDirectorySpecified = handleDirectorySpecified
exports.getFileType = getFileType
exports.handleIndexify = handleIndexify
