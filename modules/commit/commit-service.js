const {
    areThereChangesToCommit,
    areThereUnstagedFiles,
    buildCommitMessage,
    createNewCommit,
    getCommitInfo,
    stageFiles,
    showStatus,
    verifyUserWantsToStageFiles
} = require('./create-commit');

function commitSource() {
    return getCommitInfo()
        .then(commitData => buildCommitMessage(commitData))
        .then(branchName => createNewCommit(branchName))

        .then((commitMessage) => console.log(`Commit complete: "${commitMessage}"`))
        .catch((error) => console.log('Unable to create commit', error));
}

function promptUserToStageFiles() {
    return showStatus()
        .then(({ stdout }) => console.log(`\nUnstaged file status:\n\n${stdout}`))
        .then(() => verifyUserWantsToStageFiles());
}

function handleUnstagedFiles() {
    const doNotStageFiles = false;
    const doNothing = null;

    return areThereUnstagedFiles()
        .then((unstagedFilesExist) =>
            unstagedFilesExist
                ? promptUserToStageFiles()
                : doNotStageFiles)

        .then((userWantsToStageFiles) =>
            userWantsToStageFiles
                ? stageFiles()
                : doNothing);
}

function commitStagedFiles() {
    return areThereChangesToCommit()
        .then((changesExist) =>
            changesExist
                ? commitSource()
                : console.log('No changes to commit.'))
}

function createCommit() {
    return handleUnstagedFiles()
        .then(() => commitStagedFiles());
}

module.exports = {
    createCommit
};
