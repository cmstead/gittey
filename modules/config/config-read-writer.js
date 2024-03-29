const fs = require('fs');
const path = require('path');

const { isFile, readJsonFile, writeJsonFile } = require('./file-service');

const projectConfigPath = path.join(process.cwd(), 'gittey-config.json');
const emptyConfigPath = path.join(__dirname, '..', '..', 'default-configurations', 'empty-config.json');
const arloNotationPath = path.join(__dirname, '..', '..', 'default-configurations', 'arlo-notation.json');
const simpleArloNotationPath = path.join(__dirname, '..', '..', 'default-configurations', 'simplified-arlo-notation.json');

function readArloNotation() {
    return readJsonFile(arloNotationPath);
}

function readSimpleArloNotation() {
    return readJsonFile(simpleArloNotationPath);
}

function readEmptyConfig() {
    return readJsonFile(emptyConfigPath);
}

function readConfig() {
    if (isFile(projectConfigPath)) {
        return readJsonFile(projectConfigPath);
    } else {
        return readEmptyConfig();
    }
}

function writeConfig(config) {
    writeJsonFile(projectConfigPath, config);
}

module.exports = {
    readArloNotation,
    readSimpleArloNotation,
    readConfig,
    readEmptyConfig,
    writeConfig
};