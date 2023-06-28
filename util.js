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
const { contentJs, contentTs, contentSass, contentIndex } = require("./content.js")

// ******************************************************************************************************************

// checks if file type is declared within input, then overrides defaults
const getFileType = (commands) => {
  let fileType = defaults.filetype;
  let styleType = defaults.styling;
  let fileNames = []

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
      case "tailwind":
        styleType = "tailwind";
        break;
      default:
        if (!item.startsWith('-') && !item.includes(":"))
          fileNames.push(item)
        break;
    }
  })
  return { fileNames, fileType, styleType, autoCapitalize: defaults.autoCapitalize };
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

// checks if directory is decalred
const handleDirectorySpecified = (args) => {
  const newRoot = args.find(arg => regexIn.test(arg))
  if (newRoot) {
    const dirName = newRoot.slice(3);
    const folderPath = path.join(process.cwd() + defaults.root, dirName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    process.chdir(folderPath);
  }
};

// checks if indexify is enabled
const isIndexifyEnable = (commands) => {
  return commands.some(item => item === "-indexify");
};

// create directory
const createDirectory = (dirName) => {
  fs.mkdir(`${process.cwd()}/${dirName}`, () => { });
};

// writes a component with directory and styling
const writeComponent = (
  fileName = "",
  fileType = "",
  styleType = "",
  autoCapitalize = "",
) => {
  fileName = autoCapitalize
    ? fileName.charAt(0).toUpperCase() + fileName.slice(1)
    : fileName;

  console.log(`> Creating ${fileName}...`);

  createDirectory(fileName);

  fs.writeFileSync(
    `${process.cwd()}/${fileName}/${fileName}${fileType}`,
    fileType === ".tsx" ? contentTs(fileName, styleType) : contentJs(fileName, styleType)
  );

  styleType && styleType !== "tailwind"
    ? fs.writeFileSync(
      `${process.cwd()}/${fileName}/${fileName}${styleType}`,
      contentSass(fileName)
    )
    : null;
  console.log(`> Created <${fileName}/> component!`);
};

const handleIndexify = (fileType) => {
  const folderPath = process.cwd();
  console.log("> Indexifying...");

  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const subdirectories = files
      .filter(file => file.isDirectory())
      .map(file => file.name);
    const fileName = `index${fileType === ".tsx" ? ".ts" : ".js"}`

    fs.writeFileSync(fileName, contentIndex(subdirectories, fileType))
    console.log(`> Created ${fileName}!`)

  });
}

exports.configFileExists = configFileExists
exports.isIndexifyEnable = isIndexifyEnable
exports.writeComponent = writeComponent
exports.handleDirectorySpecified = handleDirectorySpecified
exports.getFileType = getFileType
exports.handleIndexify = handleIndexify
