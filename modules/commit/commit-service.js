const { buildCommitMessage, createNewCommit, getCommitInfo } = require('./create-commit');
const configService = require('../config/config-service');

function createCommit() {
    const { commitPrefix } = configService.getConfig();

    getCommitInfo(commitPrefix)
        .then(function (commitData) {
            const branchName = buildCommitMessage(commitData, commitPrefix);

            return createNewCommit(branchName);
        })
        .then(function (commitMessage) {
            console.log(`Commit complete: ${commitMessage}`);
        })
        .catch(function (error) {
            console.log('Unable to create branch', error);
        });
}

module.exports = {
    createCommit
};
