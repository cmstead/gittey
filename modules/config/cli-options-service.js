const { getAliases, getCliOptions: readCliOptions } = require("../runtime/runtime-helper");

const currentOptions = {};

function loadCliOptions() {
    const aliases = getAliases();
    const cliOptions = readCliOptions(aliases);

    const args = cliOptions._unknown || [];

    currentOptions.cliOptions = cliOptions;
    currentOptions.args = args;
    currentOptions.aliases = aliases;

    return currentOptions;
}

function getCliOptions() {
    return currentOptions.cliOptions;
}

module.exports = {
    loadCliOptions,
    getCliOptions
};