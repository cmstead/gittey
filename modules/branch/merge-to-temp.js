const childProcess = require('child_process');
const util = require('util');

const inquirer = require('inquirer');

const { readBranchNames, selectBranch, attemptMerge, getCurrentBranch } = require('./branch-utils');

function checkoutBranch(branchName) {
    const gitCommand = `git checkout -b ${branchName}`;

    return util.promisify(childProcess.exec)(gitCommand);
}

function getTempBranchName() {
    return inquirer.prompt([
        {
            name: 'tempBranchName',
            message: 'Name of the temp branch to merge to'
        }
    ])
    .then(function(result){
        return result.tempBranchName;
    });
}

function mergeToTemp() {
    let sourceBranch = '';

    return readBranchNames()
        .then(function (branchNames) {
            return selectBranch(branchNames, "Select branch to merge from");
        })
        .then(function (sourceBranchName) {
            sourceBranch = sourceBranchName;
        })
        .then(function () {
            return getTempBranchName();
        })
        .then(function (branchName) {
            return checkoutBranch(branchName)
        })
        .then(function () {
            return attemptMerge(sourceBranch);
        });
}

module.exports = {
    mergeToTemp
}