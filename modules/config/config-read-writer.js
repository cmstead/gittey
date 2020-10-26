const fs = require('fs');
const path = require('path');

const globalConfigPath = path.join(__dirname, '..', '..', 'global-config.json');
const emptyConfigPath = path.join(__dirname, '..', '..', 'default-configurations', 'empty-config.json');
const arloNotationPath = path.join(__dirname, '..', '..', 'default-configurations', 'arlo-notation.json');

function readJsonFile(filePath) {
    try{
        const configString = fs.readFileSync(filePath, { encoding: 'utf8' });
        return JSON.parse(configString);
    } catch(e) {
        console.log(`Unable to read file at path "${filePath}"`, e);
    }
}

function readArloNotation() {
    return readJsonFile(arloNotationPath);
}

function readEmptyConfig() {
    return readJsonFile(emptyConfigPath);
}

function readConfig() {
    return readJsonFile(globalConfigPath);
}

function writeConfig(config) {
    try{
        const configString = JSON.stringify(config, null, 4);
        fs.writeFileSync(globalConfigPath, configString);
    } catch (e) {
        console.log('Unable to write global config file.', e);
    }
}

module.exports = {
    readArloNotation,
    readConfig,
    readEmptyConfig,
    writeConfig
};