require('console.table');
const chalk = require('chalk');

const configService = require('../config/config-service');

function collectPrefixData(prefixes) {
    return Object.keys(prefixes)
        .map(key => ({
            [chalk.bold('Prefix')]: key,
            [chalk.bold('Description')]: prefixes[key]
        }));
}

function displayBranchPrefixes() {
    const config = configService.getConfig();
    const prefixData = collectPrefixData(config.commitPrefix.prefixes);

    console.log();
    console.log(chalk.underline('Branch Name Prefixes:'));
    console.log();
    console.table(prefixData);
}

module.exports = {
    displayBranchPrefixes
};
