const { readConfig, readEmptyConfig, writeConfig } = require('./config-read-writer');

let config = null;

function initializeConfig() {
    if(config === null) {
        config = readConfig();
    }
}

function copyConfig(config) {
    return JSON.parse(JSON.stringify(config));
}

function updateConfig(key, value) {
    initializeConfig();

    config[key] = value;

    writeConfig(config);
}

function getConfigProperty(key) {
    initializeConfig();

    return copyConfig(config[key]);
}

function getConfig() {
    initializeConfig();

    return copyConfig(config);
}

function clearConfig() {
    const emptyConfig = readEmptyConfig();

    Object.keys(emptyConfig).forEach(function(key) {
        updateConfig(key, emptyConfig[key]);
    });
}

module.exports = {
    clearConfig,
    getConfig,
    getConfigProperty,
    updateConfig
};