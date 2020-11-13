const childProcess = require('child_process');
const inquirer = require('inquirer');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);

function readBranchNames() {
    const branchCommand = 'git branch';
    const branchPrefixPattern = /^\s\s/;

    return exec(branchCommand)
        .then(result => {
            return result.stdout.split('\n')
                .filter(branchName => branchPrefixPattern.test(branchName))
                .map(branchName => branchName.replace(branchPrefixPattern, ''));
        });
}

function selectBranch(branchNames, message = "Select a branch") {
    return inquirer.prompt([
        {
            name: 'branchName',
            message: message,
            type: 'list',
            choices: branchNames
        }
    ])
        .then(function (result) {
            return result.branchName;
        });
}

module.exports = {
    readBranchNames,
    selectBranch
}

