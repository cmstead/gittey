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

function getCurrentBranch() {
    const branchCommand = 'git branch';
    const branchPrefixPattern = /^*\s/;

    return exec(branchCommand)
        .then(result => {
            return result.stdout.split('\n')
                .filter(branchName => branchPrefixPattern.test(branchName))
                .map(branchName => branchName.replace(branchPrefixPattern, ''))[0];
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

function attemptMerge(branchToMerge) {
    const gitCommand = `git merge ${branchToMerge}`;

    try {
        childProcess.execSync(gitCommand);

        console.log('Update completed successfully');
    } catch (e) {
        console.log(`Failed to merge changes from ${branchToMerge}`, e);
    }
}

module.exports = {
    attemptMerge,
    getCurrentBranch,
    readBranchNames,
    selectBranch
}

