const { readBranchNames, selectBranch, attemptMerge } = require('./branch-utils');

function mergeFromBranch() {
    return readBranchNames()
        .then(function (branchNames) {
            return selectBranch(branchNames, "Select branch to merge from");
        })
        .then(function (branchName) {
            return attemptMerge(branchName);
        });
}

module.exports = {
    mergeFromBranch
}