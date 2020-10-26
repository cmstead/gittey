const configService = require('../config/config-service');
const { getBranchPrefixConfig } = require('./branch-prefix-config');

function configureBranchPrefixes() {
    return getBranchPrefixConfig()
        .then(function(branchPrefixConfig) {
            configService.updateConfig('branchPrefix', branchPrefixConfig);
        })
}

function clearConfig() {

}

module.exports = {
    configureBranchPrefixes,
    clearConfig: configService.clearConfig
};