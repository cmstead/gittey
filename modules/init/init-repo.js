const inquirer = require('inquirer');
const { execGitCommand } = require('../shared/git-runner');

function getBranchName() {
    return inquirer.prompt([
        {
            name: 'branchName',
            type: 'input',
            default: 'main',
            validate: (branchName) => branchName.length > 0
        }
    ])
        .then(({ branchName }) => {
            return branchName;
        });
}

function renameBranch(branchName) {
    return execGitCommand(`git checkout -b ${branchName}`);
}

function initRepo() {
    return execGitCommand(`git init`)
        .then(() => getBranchName())

        .then((branchName) => {
            if (branchName !== 'master') {
                return renameBranch(branchName);
            }
        })

        .catch(function (error) {
            console.log(`Unable to initialize repository: ${error.message}`);
        });
}

module.exports = {
    initRepo
};