const chalk = require('chalk');

const configService = require('../config/config-service');
const { getBranchPrefixConfig } = require('./branch-prefix-config');
const { getCommitPrefixConfig } = require('./commit-prefix-config');

function configureBranchPrefixes() {
    console.log('');
    console.log(chalk.bold('Configure branch annotations'));
    console.log('');
    return getBranchPrefixConfig()
        .then(function(branchPrefixConfig) {
            configService.updateConfig('branchPrefix', branchPrefixConfig);
        })
}

function configureCommitPrefixes() {
    console.log('');
    console.log(chalk.bold('Configure commit annotations'));
    console.log('');
    return getCommitPrefixConfig()
        .then(function(commitPrefixConfig) {
            configService.updateConfig('commitPrefix', commitPrefixConfig);
        })
}


module.exports = {
    configureBranchPrefixes,
    configureCommitPrefixes,
    clearConfig: configService.clearConfig
};