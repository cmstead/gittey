const childProcess = require('child_process');
const { attemptMerge } = require('./branch-utils');

const commonTrunkBranches = ['master', 'main'];

function fetchTrunk(branchIndex = 0) {

    const selectedBranch = commonTrunkBranches[branchIndex];
    const fetchCommand = `git fetch origin ${selectedBranch}`;

    try {
        console.log(`Attempting to fetch ${selectedBranch}`);
        
        childProcess.execSync(fetchCommand);
        return selectedBranch;
    } catch (e) {
        if (branchIndex < commonTrunkBranches.length - 1) {
            return fetchTrunk(branchIndex + 1);
        } else {
            console.log('Unable to fetch trunk changes.', e);

            return null;
        }
    }
}

function updateCurrentBranch() {
    const fetchedBranch = fetchTrunk();

    if (fetchedBranch !== null) {
        return attemptMerge(`origin/${fetchedBranch}`);
    }

    return Promise.resolve(null);
}

module.exports = {
    updateCurrentBranch
}

