const inquirer = require('inquirer');
const { execGitCommand } = require('../shared/git-runner');

function readBranchNames(remote = false) {
    const remoteFlag = remote ? ' -r' : '';
    const branchCommand = `git branch${remoteFlag}`;
    const branchPrefixPattern = /^\s\s/;

    return execGitCommand(branchCommand)
        .then((result) => result.stdout.split('\n')
            .filter(branchName => branchPrefixPattern.test(branchName))
            .map(branchName => branchName.replace(branchPrefixPattern, ''))
            .map((branchName) => remote ? branchName.split('/').slice(1).join('/') : branchName));
}

function getCurrentBranch() {
    const branchCommand = 'git branch';
    const branchPrefixPattern = /^\*\s/;

    return execGitCommand(branchCommand)
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

    return execGitCommand(gitCommand)
        .catch((error) => {
            console.log(`Failed to merge changes from ${branchToMerge}`, error);
        });
}

module.exports = {
    attemptMerge,
    getCurrentBranch,
    readBranchNames,
    selectBranch
}

