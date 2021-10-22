const { execGitCommand } = require('../shared/git-runner');

const { readBranchNames, selectBranch, attemptMerge, getCurrentBranch } = require('./branch-utils');

function checkoutBranch(branchName) {
    const gitCommand = `git checkout ${branchName}`;

    return execGitCommand(gitCommand);
}

function mergeToBranch() {
    let currentBranch = '';

    return getCurrentBranch()
        .then(function (branchName) {
            currentBranch = branchName;
        })
        .then(function () {
            return readBranchNames();
        })
        .then(function (branchNames) {
            return selectBranch(branchNames, "Select branch to merge to");
        })
        .then(function (branchName) {
            return checkoutBranch(branchName)
        })
        .then(function () {
            return attemptMerge(currentBranch);
        })
        .finally(function() {
            checkoutBranch(currentBranch);
        });
}

module.exports = {
    mergeToBranch
}