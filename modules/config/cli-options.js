const commandLineArgs = require('command-line-args');

const definitions = [
    { name: "configure-branch-annotations", type: Boolean },
    { name: "clear-configuration", type: Boolean },
    { name: "branch-prefixes", type: Boolean },
    { name: "new-branch", type: Boolean }
];

module.exports = commandLineArgs(definitions);