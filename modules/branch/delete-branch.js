const childProcess = require('child_process');
const inquirer = require('inquirer');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);

function readBranchNames() {
    const branchCommand = 'git branch';

    return exec(branchCommand)
        .then(result => {
            return result.stdout.split('\n')
                .map(branchName => branchName.replace(/^\*|\s\s/, ''));
        });
}

function selectBranch(branchNames) {
    return inquirer.prompt([
        {
            name: 'branchName',
            message: 'Select a branch to delete',
            type: 'list',
            choices: branchNames
        }
    ])
    .then(function(result){
        return result.branchName;
    });
}

function getBranchName() {
    return readBranchNames()
        .then(branchNames => selectBranch(branchNames))
        .catch(function (error) {
            console.log('Unable to select branch for delete', error);
        });
}

function deleteBranchByName(branchName) {
    const gitCommand = `git branch -D ${branchName}`;

    inquirer.prompt([
        {
            name: 'deleteOk',
            message: `The branch ${branchName} will be permanently deleted! [y/N]`,
            default: 'n',
        	validate: (deleteOk) => {
                return deleteOk.toLowerCase() === 'y'
                    || deleteOk.toLowerCase() === 'n';
            }
        }
    ])
    .then(function(result){
        if(result.deleteOk.toLowerCase() === 'y') {
            return exec(gitCommand);
        } else {
            console.log('Branch delete was canceled');
        }
    });

}

module.exports = {
    getBranchName,
    deleteBranchByName
}