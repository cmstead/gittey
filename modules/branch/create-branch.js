const childProcess = require('child_process');
const { promisify } = require('util');

const inquirer = require('inquirer');

const { createValidator } = require('../shared/shared');

function getPrefixOptions(branchPrefix) {
    return Object.keys(branchPrefix.prefixes)
        .map(function (key) {
            return `${key} - ${branchPrefix.prefixes[key]}`;
        });
}

function buildBranchName(branchData, branchPrefix) {
    const prefix = branchData.prefix.split(' - ')[0];
    const name = branchData.branchName;
    const separator = branchPrefix.separator;

    return `${prefix}${separator}${name}`;

}

function getBranchInfo(branchPrefixConfig) {
    const validatorPattern = new RegExp(branchPrefixConfig.validator);
    const prefixOptions = getPrefixOptions(branchPrefixConfig);

    let prompts = [
        {
            name: 'branchName',
            message: 'Branch name:',
            validate: createValidator(validatorPattern)
        }
    ];

    if(prefixOptions.length > 0) {
        prompts.unshift({
            name: 'prefix',
            message: 'What are you working on?',
            type: 'list',
            choices: getPrefixOptions(branchPrefixConfig)
        })
    }

    return inquirer.prompt(prompts);
}

function createNewBranch(branchName) {
    const gitCommand = `git checkout -b ${branchName}`;

    return promisify(childProcess.exec)
        .call(null, gitCommand)
        .then(() => branchName);
}

module.exports = {
    buildBranchName,
    createNewBranch,
    getBranchInfo
}