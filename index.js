const constants = () => {
    const regexIn = /^in:\S*$/;
    const regexRoot = /^root:\S*$/;
    const defaultConfig = {
        filetype: ".jsx",
        styling: ".scss",
        autoCapitalize: true,
        root: "/src",
    };
    const configFile = "config.json"

    return {
        regexIn,
        regexRoot,
        defaultConfig,
        configFile,
    }
}

const configure = async () => {
    // lib
    const fs = await import("fs")
    const inquirer = await import("inquirer")

    // constants
    const { defaultConfig, configFile } = constants()

    // creates a default config file
    const initializeConfig = (defaultData = defaultConfig) => {
        console.log("\x1b[33m", "> Creating config...")
        try {
            fs.writeFileSync(`${__dirname}/${configFile}`, JSON.stringify(defaultData, null, "  "));
            fs.writeFileSync(`./${configFile}`, JSON.stringify(defaultData, null, "  "));
        }
        catch (error) {
            console.log("\x1b[31m", "- Error while generating config!")
            console.error(error)
        }
    };


    let defaults;

    try {
        const data = fs.readFileSync('./config.json', 'utf8');
        defaults = JSON.parse(data);
    } catch (error) {
        try {
            const data = fs.readFileSync(`${__dirname}/${configFile}`, 'utf8');
            defaults = JSON.parse(data);
        }
        catch (error) {

            if (error.code === 'ENOENT') {
                initializeConfig();
            } else {
                // Handle other errors if needed
                console.log("Error while reading file");
                console.error(error)
            }
        }
    }


    // print options to intialize config
    const printOptions = async () => {
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
        const exportOption = [
            { name: "export default", value: "exportDefault" },
            { name: "export", value: "export" },
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
            {
                type: "list",
                name: "exportOption",
                message: "Export option?",
                choices: exportOption,
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

    return {
        printOptions,
        initializeConfig,
        getConfig,
        emptyArgs,
        defaults,
    }
}


const content = () => {


    const handleExport = (fileName, fileType, styleType) => {
        switch (fileType) {
            case ".jsx":
                return contentJs(fileName, styleType)
            case ".tsx":
                return contentTs(fileName, styleType)
            case ".js":
                return contentJs(fileName, styleType)
            default:
                return contentJs(fileName, styleType)
        }
    }

    const handleExportDefault = (fileName, fileType, styleType) => {
        switch (fileType) {
            case ".jsx":
                return contentJsDefault(fileName, styleType)
            case ".tsx":
                return contentTsDefault(fileName, styleType)
            case ".js":
                return contentJsDefault(fileName, styleType)
            default:
                return contentJsDefault(fileName, styleType)
        }
    }

    const contentJsDefault = (name, styleType) => `import React from "react";
${styleType !== "tailwind" ? `
import "./${name}${styleType}";
`
            : ``}
const ${name} = () => {
  return (
    <div>${name}</div>
  )
}

export default ${name}
`;
    const contentTsDefault = (name, styleType) => `import React from "react";
${styleType !== "tailwind" ? `
import "./${name}${styleType}";
`
            : ``}
interface ${name}Props {}

const ${name}:React.FC<${name}Props> = () => {
  return (
    <div>${name}</div>
  )
}

export default ${name}
`;



    const contentJs = (name, styleType) => `import React from "react";
${styleType !== "tailwind" ? `
import "./${name}${styleType}";
`
            : ``}
export const ${name} = () => {
  return (
    <div>${name}</div>
  )
}
`;

    const contentTs = (name, styleType) => `import React from "react";
${styleType !== "tailwind" ? `
import "./${name}${styleType}";
`
            : ``}
interface ${name}Props {}

export const ${name}:React.FC<${name}Props> = () => {
  return (
    <div>${name}</div>
  )
}
`;

    const contentSass = (name) => {
        return "";
    };

    const contentIndex = (directories = [], exportOption, fileType) => {
        directories = directories.sort()
        let indexFileContent = ""
        switch (fileType) {

            case ".jsx":
                indexFileContent = directories.map(item =>
                    `import ${handleImport(item, exportOption)} from ${handleFolder(item, fileType)};`
                ).join("\n") + `
  
export { ${directories.join(", ")} };
  `
                break;

            case ".js":
                indexFileContent = directories.map(item =>
                    `import ${handleImport(item, exportOption)} from ${handleFolder(item, fileType)};`).join("\n") + `
  
export { ${directories.join(", ")} };
  `
                break;

            case ".tsx":
                if (exportOption === "export")
                    indexFileContent = directories.map(item =>
                        `export ${handleImport(item, exportOption)} from ${handleFolder(item, fileType)};`
                    ).join("\n") + `
  `
                else {
                    indexFileContent = directories.map(item =>
                        `import ${handleImport(item, exportOption)} from ${handleFolder(item, fileType)};`).join("\n") + `
  
export { ${directories.join(", ")} };
  `
                }
                break;

            default:

        }
        return indexFileContent
    }

    const handleImport = (fileName, exportOption) => {
        if (exportOption === "export")
            return `{ ${fileName} }`
        return `${fileName}`
    }

    const handleFolder = (item, fileType) => {
        return `"./${item}/${item}${fileType === '.jsx' ? '.jsx' : ""}"`
    }


    const generateContent = (fileName, fileType, styleType, exportOption) => {
        switch (exportOption) {
            case "exportDefault":
                return handleExportDefault(fileName, fileType, styleType)
            case "export":
                return handleExport(fileName, fileType, styleType)
            default:
                return handleExport(fileName, fileType, styleType)
        }
    }

    return {
        generateContent,
        contentSass,
        contentIndex,
    }
}


const util = async (defaults) => {
    // lib
    const fs = await import('fs');
    const path = await import('path');

    // constants
    const {
        regexRoot,
        regexIn,
        configFile,
    } = constants();


    // content
    const { generateContent, contentSass, contentIndex } = content()

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
    const configFileExists = async () => {
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
        return commands.some(item => item === "-indexify" || item == '-i');
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

    return {
        configFileExists,
        isIndexifyEnable,
        writeComponent,
        handleDirectorySpecified,
        getFileType,
        handleIndexify,
    }

}

const index = async () => {
    const { getConfig, emptyArgs, defaults } = await configure()
    const {
        handleIndexify,
        isIndexifyEnable,
        writeComponent,
        handleDirectorySpecified,
        getFileType } = await util(defaults)

    // *******************************************************

    const args = process.argv.slice(2);
    if (!args || !args?.length) {
        emptyArgs()
        return
    }
    if (getConfig(args)) {
        return
    };
    const indexify = isIndexifyEnable(args)
    try {
        handleDirectorySpecified(args)
    }
    catch (error) {
        console.log("\x1b[31m", "- Cannot generate the components! Try changing app root in config")
        return
    }
    const { fileNames, fileType, styleType, autoCapitalize, exportOption } = getFileType(args)
    fileNames.forEach(file => {
        writeComponent(file, fileType, styleType, autoCapitalize, exportOption)
    })
    if (indexify) handleIndexify(fileType, exportOption)


}

module.exports = { application: () => index() };
