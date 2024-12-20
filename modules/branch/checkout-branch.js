const { execGitCommand } = require('../shared/git-runner');

var { selectBranch, readBranchNames } = require('./branch-utils');

function checkout(branchName, args) {
    const command = `git checkout ${args ? args.join(' ') : ''} ${branchName}`;

    return execGitCommand(command)
        .then(() => branchName);
}

function checkoutBranch(_, { remote = false, _unknown = [] }) {
    if (!remote && _unknown.length > 0) {
        return checkout(_unknown[0], _unknown.slice(1));
    } else {
        return readBranchNames(remote)
            .then(branchNames => {
                if (branchNames.length > 0) {
                    selectBranch(branchNames)
                        .then(branchName =>
                            checkout(branchName, _unknown))
                } else {
                    return console.log('No branches to check out');
                }
            });
    }
}

module.exports = {
    checkoutBranch
};