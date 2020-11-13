const childProcess = require('child_process');
const inquirer = require('inquirer');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);

const branchUtils = require('./branch-utils');

function getBranchName() {
    return branchUtils
        .readBranchNames()
        .then(branchNames => branchUtils
            .selectBranch(branchNames, 'Select a branch to delete'))
        .catch(function (error) {
            console.log('Unable to select branch for delete', error);
        });
}

function deleteBranchByName(branchName) {
    deleteBranches([branchName]);
}

function deleteBranches([...branchNames]) {
    const gitCommand = `git branch -D ${branchNames.join(' ')}`;

    return inquirer.prompt([
        {
            name: 'deleteOk',
            message: `The branch(s) ${branchNames.join(', ')} will be permanently deleted! [y/N]`,
            default: 'n',
            validate: (deleteOk) => {
                return deleteOk.toLowerCase() === 'y'
                    || deleteOk.toLowerCase() === 'n';
            }
        }
    ])
        .then(function (result) {
            if (result.deleteOk.toLowerCase() === 'y') {
                return exec(gitCommand);
            } else {
                console.log('Branch delete was canceled');
            }
        });

}

function pruneBranches() {
    return readBranchNames()
        .then(function (branchNames) {
            return inquirer.prompt([
                {
                    name: 'selectedBranches',
                    type: 'checkbox',
                    message: 'Choose branches to delete',
                    choices: branchNames
                }
            ]);
        })
        .then(function (result) {
            return deleteBranches(result.selectedBranches);
        })
        .catch(function (error) {
            console.log('Unable to delete selected branches', error);
        });
}

function deleteBranchBySelectedName() {
    return getBranchName()
        .then(branchName => deleteBranchByName(branchName))
        .catch(function(error){
            console.log('Unable to delete branch', error);
        });
}

module.exports = {
    deleteBranchByName,
    deleteBranchBySelectedName,
    getBranchName,
    pruneBranches
}