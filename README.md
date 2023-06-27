# eshaan-cli
CLI to help me build React/Next apps 

Built with NodeJS. The perfect package to start making any app!

## Initialization
Typing `eshaan` enters into the input configuration mode, and initializes the configuration for the CLI tool.
```
eshaan
```

## Options

* ### Build component templates
input the names of the components cascadingly into the CLI, generating the necessary styling and tsx/jsx/js files, with their own folder
```
eshaan componentName1 componentName2
```

* ### `-config`
displays the config file for the current state for the CLI. this can be easily updated using the `eshaan` command
<br/>
* ### `-ts -js -jsx`
sets the file type for a single run of the eshaan CLI, without affecting the CLI's stored configuration. perfect for changing type on the go for small alterations.
```
eshaan -ts componentName
```
* ### `-scss -css -tailwind`
sets the styling type for the single run of ghthe eshaan CLi, without ...
* ### `-indexify`
creates the necessary indexes of the cli components within the directory. this creates easy importing and exprting of tthe React components
* ### `in:`


## Examples
