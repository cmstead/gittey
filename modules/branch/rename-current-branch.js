const inquirer = require("inquirer");
const { getCurrentBranch } = require('./branch-utils');
const { execGitCommand } = require("../shared/git-runner");

function renameCurrentBranch() {
    let currentBranchName = null;

    return getCurrentBranch()
        .then((branchName) => currentBranchName = branchName)

        .then(() =>
            inquirer.prompt([
                {
                    name: 'newBranchName',
                    type: 'input',
                    message: 'Rename current branch to:',
                    validate: (name) => name.length > 0
                }
            ]))
        .then(({ newBranchName }) => execGitCommand(`git checkout -b ${newBranchName}`))
        .then(() => execGitCommand(`git branch -D ${currentBranchName}`))

        .catch(function (error) {
            console.log(`Cannot rename branch: ${error.message}`);
        });
}

module.exports = {
    renameCurrentBranch
};