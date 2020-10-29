#!/usr/bin/env node

const { match } = require('matchlight');

const package = require('./package.json');

const { configureBranchPrefixes, clearConfig } = require('./modules/setup/configure-gittey');
const cliOptions = require('./modules/config/cli-options');
const branchPrefixes = require('./modules/help/branch-prefixes');
const commitPrefixes = require('./modules/help/commit-prefixes');
const commitService = require('./modules/commit/commit-service');
const branchService = require('./modules/branch/branch-service');
const helpOutput = require('./modules/help/help-output');


match(cliOptions, function (onCase, onDefault) {
    onCase({ ['new-branch']: true },
        () => branchService.createBranch());

    onCase({ ['commit']: true },
        () => commitService.createCommit());

    onCase({ ['configure-branch-annotations']: true },
        () => configureBranchPrefixes()
            .then(() => console.log('Branch prefixes configured.')));

    onCase({ ['reset-configuration']: true },
        () => clearConfig());

    onCase({ ['branch-prefixes']: true },
        () => branchPrefixes.displayBranchPrefixes());

    onCase({ ['commit-prefixes']: true },
        () => commitPrefixes.displayBranchPrefixes());

    onCase({ ['commit-prefixes']: true },
        () => commitPrefixes.displayBranchPrefixes());

    onCase({ ['help']: true },
        () => helpOutput.display());

    onCase({ ['version']: true }, () => console.log(`v${package.version}`));

    onDefault(() => {
        console.log('Gittey: unknown command, sorry.');
        process.exit(1);
    });
});