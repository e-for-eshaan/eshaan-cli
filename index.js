const { getConfig, emptyArgs } = require("./configure")
const {
    handleIndexify,
    isIndexifyEnable,
    writeComponent,
    handleDirectorySpecified,
    getFileType } = require("./util")

// *******************************************************

const application = () => {
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

exports.writeComponentPublic = application;
