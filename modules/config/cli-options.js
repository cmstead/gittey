const commandLineArgs = require('command-line-args');

const options = require('./cli-options-data');

function addDashes(value) {
    if (!value.startsWith('-')) {
        return `--${value}`;
    }

    return value;
}

module.exports = (aliases = []) => {

    aliases.forEach(function (alias) {
        options.push({
            name: alias.name,
            description: 'User defined command',
            type: Boolean
        });
    });

    let args = process.argv.slice(2);

    args[0] = addDashes(args[0]);

    const result = commandLineArgs(options, { stopAtFirstUnknown: true, argv: args });

    if(typeof result.args !== 'undefined' && typeof result._unknown !== 'undefined') {
        result.args = result.args.concat(result._unknown);
    }

    return result;
};