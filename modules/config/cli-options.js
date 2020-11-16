const commandLineArgs = require('command-line-args');

const options = require('./cli-options-data');

function addDashes(value) {
    if (!value.startsWith('-')) {
        return `--${value}`;
    }
}

module.exports = (aliases = []) => {

    aliases.forEach(function (alias) {
        options.push({
            name: alias.name,
            description: 'User defined command',
            type: Boolean
        });
    });

    const args = process.argv.slice(2).map(addDashes);

    return commandLineArgs(options, { argv: args });
};