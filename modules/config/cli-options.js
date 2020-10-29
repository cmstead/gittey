const commandLineArgs = require('command-line-args');

const options = require('./cli-options-data');

const definitions = options;

module.exports = commandLineArgs(definitions);