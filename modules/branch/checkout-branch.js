const childProcess = require('child_process');
const { promisify } = require('util');

var { selectBranch, readBranchNames } = require('./branch-utils');

function checkout(branchName) {
    const command = `git checkout ${branchName}`;

    return promisify(childProcess.exec)
        .call(null, command)
        .then(() => branchName);
}

function checkoutBranch() {
    return readBranchNames()
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