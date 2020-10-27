const { buildBranchName, createNewBranch, getBranchInfo } = require('./create-branch');
const configService = require('../config/config-service');

function createBranch() {
    const { branchPrefix } = configService.getConfig();

    getBranchInfo(branchPrefix)
        .then(function (branchData) {
            const branchName = buildBranchName(branchData, branchPrefix);

            return createNewBranch(branchName);
        })
        .then(function (branchName) {
            console.log(`Branch ${branchName} created.`);
        })
        .catch(function (error) {
            console.log('Unable to create branch', error);
        });
}

module.exports = {
    createBranch
};
