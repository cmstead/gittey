const { execGitCommand } = require('../shared/git-runner');

var { selectBranch, readBranchNames } = require('./branch-utils');

function checkout(branchName) {
    const command = `git checkout ${branchName}`;

    return execGitCommand(command)
        .then(() => branchName);
}

function checkoutBranch(_, { remote = false }) {
    return readBranchNames(remote)
        .then(branchNames => {
            if (branchNames.length > 0) {
                selectBranch(branchNames)
                    .then(branchName =>
                        checkout(branchName))
            } else {
                return console.log('No branches to check out');
            }
        });
}

module.exports = {
    checkoutBranch
};