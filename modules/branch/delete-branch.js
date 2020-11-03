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
    .then(function(result){
        if(result.deleteOk.toLowerCase() === 'y') {
            return exec(gitCommand);
        } else {
            console.log('Branch delete was canceled');
        }
    });

}

function pruneBranches() {
    return readBranchNames()
        .then(function(branchNames){
            return inquirer.prompt([
                {
                    name: 'selectedBranches',
                    type: 'checkbox',
                    message: 'Choose branches to delete',
                    choices: branchNames
                }
            ]);
        })
        .then(function(result){
            return deleteBranches(result.selectedBranches);
        })
        .catch(function(error){
            console.log('Unable to delete selected branches', error);
        });
}

module.exports = {
    deleteBranchByName,
    getBranchName,
    pruneBranches
}