const fs = require('fs');
const path = require('path');

const projectConfigPath = path.join(process.cwd(), 'gittey-config.json');
const emptyConfigPath = path.join(__dirname, '..', '..', 'default-configurations', 'empty-config.json');
const arloNotationPath = path.join(__dirname, '..', '..', 'default-configurations', 'arlo-notation.json');

function readJsonFile(filePath) {
    try {
        const configString = fs.readFileSync(filePath, { encoding: 'utf8' });
        return JSON.parse(configString);
    } catch (e) {
        console.log(`Unable to read file at path "${filePath}"`, e);
    }
}

function writeJsonFile(filePath, json) {
    try {
        const configString = JSON.stringify(json, null, 4);
        fs.writeFileSync(filePath, configString);
    } catch (e) {
        console.log(`Unable to write to file path: "${filePath}"`, e)
    }
}

function readArloNotation() {
    return readJsonFile(arloNotationPath);
}

function readEmptyConfig() {
    return readJsonFile(emptyConfigPath);
}

function isFile(filePath) {
    try {
        return fs.lstatSync(filePath).isFile();
    } catch (e) {
        return false;
    }
}

function readConfig() {
    if(isFile(projectConfigPath)) {
        return readJsonFile(projectConfigPath);
    } else {
        const emptyConfig = readEmptyConfig();

        writeJsonFile(projectConfigPath, emptyConfig);

        return emptyConfig;
    }
}

function writeConfig(config) {
    writeJsonFile(projectConfigPath, config);
}

module.exports = {
    readArloNotation,
    readConfig,
    readEmptyConfig,
    writeConfig
};