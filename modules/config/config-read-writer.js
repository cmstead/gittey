const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();

const { isFile, readJsonFile, writeJsonFile } = require('./file-service');

const baseConfigName = 'gittey-config.json';

const projectConfigPath = path.join(process.cwd(), baseConfigName);
const globalConfigPath = path.join(homedir, baseConfigName);
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
    } else if (isFile(globalConfigPath)) {
        return readJsonFile(globalConfigPath);
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
