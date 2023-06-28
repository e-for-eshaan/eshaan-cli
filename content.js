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

exports.generateContent = generateContent;
exports.contentSass = contentSass;
exports.contentIndex = contentIndex;
