// config
const { defaults } = require("./configure")

const contentJs = (name, styleType) => `import React from "react";
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

const contentTs = (name, styleType) => `import React from "react";
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

const contentSass = (name) => {
  return "";
};

const contentIndex = (directories = [], fileType = "") => {
  directories = directories.sort()
  return directories.map(item => {
    return `import ${item} from "./${item}/${item}${fileType === '.jsx' ? '.jsx' : ""}";`
  }).join("\n") + `
  
export { ${directories.join(", ")} };
  `
}

exports.contentJs = contentJs;
exports.contentTs = contentTs;
exports.contentSass = contentSass;
exports.contentIndex = contentIndex;
