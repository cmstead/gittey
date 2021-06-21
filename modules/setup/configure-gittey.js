const chalk = require('chalk');
const inquirer = require('inquirer');

const configService = require('../config/config-service');
const { getBranchPrefixConfig } = require('./branch-prefix-config');
const { getCommitPrefixConfig } = require('./commit-prefix-config');
const { addCollaborator } = require('./collaborator-config');

function configureBranchPrefixes() {
    console.log('');
    console.log(chalk.bold('Configure branch annotations'));
    console.log('');
    return getBranchPrefixConfig()
        .then(function (branchPrefixConfig) {
            configService.updateConfig('branchPrefix', branchPrefixConfig);
        })
}

function configureCommitPrefixes() {
    console.log('');
    console.log(chalk.bold('Configure commit annotations'));
    console.log('');
    return getCommitPrefixConfig()
        .then(function (commitPrefixConfig) {
            configService.updateConfig('commitPrefix', commitPrefixConfig);
        })
}

function addCollaboratorAndContinue() {
    return addCollaborator()
        .then(() => inquirer.prompt([
            {
                name: 'addAnother',
                message: 'Add another collaborator?',
                type: 'confirm',
                default: false
            }
        ]))
        .then(({ addAnother }) =>
            addAnother
                ? addCollaboratorAndContinue()
                : false);
}

function configureCollaborators() {
    console.log('');
    console.log(chalk.bold('Configure project collaborators'));
    console.log('');

    return addCollaboratorAndContinue();
}


module.exports = {
    configureBranchPrefixes,
    configureCollaborators,
    configureCommitPrefixes,
    clearConfig: configService.clearConfig
};