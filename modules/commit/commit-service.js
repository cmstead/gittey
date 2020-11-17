const {
    areThereChangesToCommit,
    areThereUnstagedFiles,
    buildCommitMessage,
    createNewCommit,
    getCommitInfo,
    stageFiles,
    verifyUserWantsToStageFiles
} = require('./create-commit');

const configService = require('../config/config-service');

function commitSource() {
    const { commitPrefix } = configService.getConfig();

    return getCommitInfo(commitPrefix)
        .then(function (commitData) {
            const branchName = buildCommitMessage(commitData, commitPrefix);

            return createNewCommit(branchName);
        })
        .then(function (commitMessage) {
            console.log(`Commit complete: "${commitMessage}"`);
        })
        .catch(function (error) {
            console.log('Unable to create branch', error);
        });
}

function createCommit() {
    return areThereUnstagedFiles()
    .then(function(unstagedFilesExist){
        if(unstagedFilesExist) {
            return verifyUserWantsToStageFiles();
        } else {
            return false;
        }
    })
    .then(function(userWantsToStageFiles){
        if(userWantsToStageFiles) {
            return stageFiles();
        } else {
            return null;
        }
    })
    .then(function(){
        if(!areThereChangesToCommit()) {
            console.log('No changes to commit.');
            return;
        } else {
            return commitSource();
        }
    })
}

module.exports = {
    createCommit
};
