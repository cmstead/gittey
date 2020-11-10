const childProcess = require('child_process');

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

function attemptMerge(primaryBranch) {
    const gitCommand = `git merge ${primaryBranch}`;

    try {
        childProcess.execSync(gitCommand);

        console.log('Update completed successfully');
    } catch (e) {
        console.log('Failed to merge changes from ', e);
    }
}

function updateCurrentBranch() {
    const fetchedBranch = fetchTrunk();

    if (fetchedBranch !== null) {
        attemptMerge(`origin/${fetchedBranch}`);
    }
}

module.exports = {
    updateCurrentBranch
}

