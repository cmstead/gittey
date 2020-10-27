const childProcess = require('child_process');
const { promisify } = require('util');

const inquirer = require('inquirer');

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

function getBranchInfo(branchPrefix) {
    const validatorPattern = new RegExp(branchPrefix.validator);

    return inquirer.prompt([
        {
            name: 'prefix',
            message: 'What are you working on?',
            type: 'list',
            choices: getPrefixOptions(branchPrefix)
        },
        {
            name: 'branchName',
            message: 'Branch name:',
            validate: (branchName) => {
                return validatorPattern.test(branchName);
            }
        }
    ]);
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