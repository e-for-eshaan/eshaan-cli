// lib
const fs = require("fs");
const inquirer = require("inquirer");

// constants
const { defaultConfig, configFile } = require("./constants.js")

// creates a default config file
const initializeConfig = (defaultData = defaultConfig) => {
  console.log("Creating config")
  fs.writeFileSync(`${__dirname}\\${configFile}`, JSON.stringify(defaultData, null, "  "));
};

let defaults

try {
  defaults = require("./config.json");
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    initializeConfig();
  } else {
    // Handle other errors if needed
    console.error(error);
  }
}


// *****************************************************************************

// print options to intialize config
const printOptions = () => {
  const stylingChoices = [
    {
      name: "Sass",
      value: ".scss",
    },
    { name: "CSS", value: ".css" },
    { name: "Tailwind", value: "tailwind" },
  ];
  const fileTypeChoices = [".jsx", ".tsx", ".js"];
  const capitalizeChoices = [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ];
  const defaultPath = [
    { name: "src", value: "/src" },
    { name: "App root", value: "/" },
  ];
  const options = [
    {
      type: "list",
      name: "filetype",
      message: "Configure default filetype",
      choices: fileTypeChoices,
    },
    {
      type: "list",
      name: "styling",
      message: "Configure default styling",
      choices: stylingChoices,
    },
    {
      type: "list",
      name: "autoCapitalize",
      message: "Autocapitlize?",
      choices: capitalizeChoices,
    },
    {
      type: "list",
      name: "root",
      message: "Select root?",
      choices: defaultPath,
    },
  ];
  const prompt = inquirer.createPromptModule();
  prompt(options).then((answers) => {
    initializeConfig(answers)
  });
};

const getConfig = (args) => {
  if (args.includes("-config")) {
    console.log("Default configurations:");
    console.log(JSON.stringify(defaults, null, "  "));
    return true;
  }
}

const emptyArgs = () => {
  printOptions();
}

exports.printOptions = printOptions;
exports.initializeConfig = initializeConfig;
exports.getConfig = getConfig;
exports.emptyArgs = emptyArgs;
exports.defaults = defaults;
