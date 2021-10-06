const inquirer = require("inquirer");
const { getCurrentBranch } = require('./branch-utils');
const { promisify } = require('util');
const { exec } = require("child_process");

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
        .then(({ newBranchName }) => promisify(exec).call(null, `git checkout -b ${newBranchName}`))
        .then(() => promisify(exec).call(null, `git branch -D ${currentBranchName}`))

        .catch(function (error) {
            console.log(`Cannot rename branch: ${error.message}`);
        });
}

module.exports = {
    renameCurrentBranch
};