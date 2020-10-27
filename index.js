const { match } = require('matchlight');

const { configureBranchPrefixes, clearConfig } = require('./modules/setup/configure-gittey');
const cliOptions = require('./modules/config/cli-options');
const branchPrefixes = require('./modules/help/branch-prefixes');
const brahcService = require('./modules/branch/branch-service');
const branchService = require('./modules/branch/branch-service');

match(cliOptions, function (onCase, onDefault) {
    onCase({ ['new-branch']: true },
        () => branchService.createBranch());

    onCase({ ['configure-branch-annotations']: true },
        () => configureBranchPrefixes()
            .then(() => console.log('Branch prefixes configured.')));

    onCase({ ['clear-configuration']: true },
        () => clearConfig());

    onCase({ ['branch-prefixes']: true },
        () => branchPrefixes.displayBranchPrefixes());

    onDefault(() => console.log('Gittey: unknown command, sorry.'));
});