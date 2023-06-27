# eshaan-cli | A CLI Tool for Building React/Next Apps

eshaan-cli is a command-line interface (CLI) tool built with Node.js that helps streamline the process of building React/Next.js applications. It provides a simple and intuitive way to generate component templates, manage configuration settings, and customize file types and styling options.

## Installation

To install eshaan-cli, use the following command:

```
npm install -g
npm link
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

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/52e66161-ebf7-4feb-8ae6-ddb26f45099d)<br/>
*Fig 2. Initializing the configurations*
<br/><br/>

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/2d268f93-fd9b-49b6-bfb0-2418c19be5c8)<br/>
*Fig 3. Creating multiple components at once*
<br/><br/>

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/f543800d-e091-402e-8efc-5946a0b907ba)<br/>
*Fig 4. Specifying directory name for creation of components*
<br/><br/>

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/6fc2d8af-3f40-44d5-b9a4-7af1bbaeda36)<br/>
*Fig 5. Using `-indexify` creates an index file for easy import and export*
<br/><br/>

![image](https://github.com/Eshaan-Y24/eshaan-cli/assets/76566992/c5dcf556-c993-46bd-b9c0-aec5bee0e1fd)<br/>
*Fig 6. using  `-ts` and `-scss` creates the components with this config, but resets on the next call*
<br/><br/>


