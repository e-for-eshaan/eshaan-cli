# eshaan-cli | A CLI Tool for Building React/Next Apps

[eshaan-cli](https://www.npmjs.com/package/eshaan) is a command-line interface (CLI) tool built with Node.js that helps streamline the process of building React/Next.js applications. It provides a simple and intuitive way to generate component templates, manage configuration settings, and customize file types and styling options.

![image](https://github.com/e-for-eshaan/eshaan-cli/assets/76566992/56a787a8-9e22-4747-96b9-5bc42e816885)

## Installation

To install eshaan-cli, use the following command:

```
npm install -g eshaan
```


## Initialization

To initialize the configuration for the eshaan-cli tool, enter the following command in your terminal:

```
eshaan
```


## Options

* ### Build component templates:
Input the names of the components cascadingly into the CLI, generating the necessary styling and tsx/jsx/js files, with their own folder.

```
eshaan componentName1 componentName2
```


* ### `-config` :
Display the config file for the current state of the CLI. This can be easily updated using the `eshaan` command.

* ### `-ts -js -jsx` :
Set the file type for a single run of the eshaan CLI, without affecting the CLI's stored configuration. Perfect for changing the file type on the go for small alterations.

```
eshaan -ts componentName
```
* ### `-ed -e` :
Let's you choose between export default and export options, which also affects the `indexify` function, by appropriately importing and exporting the components

* ### `-scss -css -tailwind` :
Set the styling type for a single run of the eshaan-CLI, without affecting the CLI's stored configuration.

* ### `in:` :
Create the components in a particular directory, within the app root, or the src folder, as stated by the `config.json` file.

```
eshaan in:components component1 component2
```


* ### `-indexify` :
Create the necessary indexes of the CLI components within the directory. This enables easy importing and exporting of React components.

```
eshaan in:layout navbar footer section -indexify
```

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/84a8c232-b344-4129-b30b-e16f4b31d7ae)<br/>
*Fig 1. Directory structure of the components*
<br/><br/>

Example of index.js file after using `-indexify` option:

```javascript
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Section from "./Section/Section";

export { Footer, Navbar, Section };
```

## Examples

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/1f31f861-034e-4186-aa06-f050b10ee5ed)
<br/>
*Fig 2. Initializing the configurations*
<br/><br/>

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/65fbc346-6014-46e2-b679-2e17bd8008ec)
<br/>
*Fig 3. Creating multiple components at once*
<br/><br/>

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/0ed6b513-9aaa-4c74-88a9-35ee608faae6)
<br/>
*Fig 4. Specifying directory name for the creation of components*
<br/><br/>

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/77e3bc45-2320-4dd4-9248-b224a75d1e54)
<br/>
*Fig 5. Using `-indexify` creates an index file for easy import and export*
<br/><br/>

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/a00fc011-c936-4e15-8f42-9eb02705144f)
<br/>
*Fig 6. using  `-ts` and `-scss` creates the components with this config, but resets on the next call*
<br/><br/>


