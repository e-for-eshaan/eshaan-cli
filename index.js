const { getConfig, emptyArgs } = require("./configure")
const {
    handleIndexify,
    isIndexifyEnable,
    writeComponent,
    handleDirectorySpecified,
    getFileType } = require("./util")

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
    handleDirectorySpecified(args)
    const { fileNames, fileType, styleType, autoCapitalize } = getFileType(args)
    fileNames.map(file => {
        writeComponent(file, fileType, styleType, autoCapitalize)
    })
    if (indexify) handleIndexify()
}

exports.writeComponentPublic = application;
