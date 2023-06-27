const defaults = require("./config.json")

const contentJs = (name, styleType) => `import React from 'react'
${styleType !== "tailwind"
    ? `
import './${name}${styleType}'
`
    : ``
  }
const ${name} = () => {
  return (
    <div>${name}</div>
  )
}

export default ${name}
`;

const contentSass = (name) => {
  return "";
};

const contentIndex = (directories = []) => {
  directories = directories.sort()
  return directories.map(item => {
    return `import ${item} from "./${item}/${item}${defaults.filetype}"`
  }).join("\n") + `
  
export {${directories.join(", ")}}
  `
}

exports.contentJs = contentJs;
exports.contentSass = contentSass;
exports.contentIndex = contentIndex;
