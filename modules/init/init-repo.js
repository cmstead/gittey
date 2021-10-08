const { promisify } = require('util');
const { exec } = require('child_process');
const inquirer = require('inquirer');

const asyncExec = promisify(exec);

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
    return asyncExec(`git checkout -b ${branchName}`);
        // .then(() => asyncExec(`git branch -D master`));
}

function initRepo() {
    return asyncExec(`git init`)
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