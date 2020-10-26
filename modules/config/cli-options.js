const commandLineArgs = require('command-line-args');

const definitions = [
    { name: "configure", type: Boolean },
    { name: "clear-configuration", type: Boolean },
    { name: "branch-prefixes", type: Boolean }
];

module.exports = commandLineArgs(definitions);