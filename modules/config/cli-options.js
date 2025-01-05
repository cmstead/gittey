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
            description: alias.description ? `alias: ${alias.description}` : 'User defined command',
            type: Boolean
        });
    });

    let args = process.argv.slice(2);

    const knownOptions = options.map(function (option) {
        return option.name;
    });

    if(args.length > 0 && !knownOptions.includes(args[0])) {
        args.unshift('passthrough');
    }

    args[0] = addDashes(args[0]);

    const result = commandLineArgs(options, { caseInsensitive: true, stopAtFirstUnknown: true, argv: args });

    if(typeof result.args !== 'undefined' && typeof result._unknown !== 'undefined') {
        result.args = result.args.concat(result._unknown);
    }

    return result;
};