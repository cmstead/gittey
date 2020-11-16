const commandLineArgs = require('command-line-args');

const options = require('./cli-options-data');

module.exports = (aliases = []) => {

    aliases.forEach(function (alias) {
        options.push({
            name: alias.name,
            description: 'User defined command',
            type: Boolean
        });
    });

    return commandLineArgs(options);
};