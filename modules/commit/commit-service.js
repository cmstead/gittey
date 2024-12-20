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

const tap = (fn) => (value) => { fn(value); return value; };

function commitSource(args) {
    return getCommitInfo()
        .then(commitData => buildCommitMessage(commitData))
        .then(tap(commitMessage => createNewCommit(commitMessage, args)))

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

function commitStagedFiles(args) {
    return areThereChangesToCommit()
        .then((changesExist) =>
            changesExist
                ? commitSource(args)
                : console.log('No changes to commit.'))
}

function createCommit(args) {
    return handleUnstagedFiles()
        .then(() => commitStagedFiles(args))
        .catch((error) => console.log('Unable to complete file commit'));
}

module.exports = {
    createCommit
};
