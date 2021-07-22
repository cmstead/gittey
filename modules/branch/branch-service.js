const { buildBranchName, createNewBranch, getBranchInfo } = require('./create-branch');
const { checkoutBranch } = require('./checkout-branch');
const { deleteBranchBySelectedName, pruneBranches } = require('./delete-branch');
const { updateCurrentBranch } = require('./update-current-branch');
const { mergeFromBranch } = require('./merge-from-branch');
const { mergeToBranch } = require('./merge-to-branch');
const { mergeToTemp } = require('./merge-to-temp');

const configService = require('../config/config-service');

function createBranch(args) {
    const { branchPrefix } = configService.getConfig();

    getBranchInfo(branchPrefix, args)
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
    checkoutBranch,
    createBranch,
    deleteBranch: deleteBranchBySelectedName,
    mergeFromBranch,
    mergeToBranch,
    mergeToTemp,
    pruneBranches,
    updateCurrentBranch
};
