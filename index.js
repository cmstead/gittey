#!/usr/bin/env node

const { match } = require('matchlight');
const chalk = require('chalk');

const package = require('./package.json');

const { configureBranchPrefixes, configureCommitPrefixes, clearConfig } = require('./modules/setup/configure-gittey');
const branchPrefixes = require('./modules/help/branch-prefixes');
const commitPrefixes = require('./modules/help/commit-prefixes');
const commitService = require('./modules/commit/commit-service');
const branchService = require('./modules/branch/branch-service');
const helpOutput = require('./modules/help/help-output');

let cliOptions;

try{
    cliOptions = require('./modules/config/cli-options');
} catch(e) {
    console.log('');
    console.log(chalk.bold('Whoops! That command doesn\'t exist, here is what Gittey can do:'));

    cliOptions = {
        help: true
    };
}

match(cliOptions, function (onCase, onDefault) {
    onCase({ ['new-branch']: true },
        () => branchService.createBranch());

    onCase({ ['commit']: true },
        () => commitService.createCommit());

    onCase({ ['init']: true },
        () => configureBranchPrefixes()
            .then(() => configureCommitPrefixes())
            .then(() => console.log('Gittey has been configured for this project.')));

    onCase({ ['configure-branch-annotations']: true },
        () => configureBranchPrefixes()
            .then(() => console.log('Branch prefixes configured.')));

    onCase({ ['configure-commit-annotations']: true },
        () => configureCommitPrefixes()
            .then(() => console.log('Commit message prefixes configured.')));

    onCase({ ['reset-configuration']: true },
        () => clearConfig());

    onCase({ ['update-current-branch']: true },
        () => branchService.updateCurrentBranch());

    onCase({ ['delete-branch']: true },
        () => branchService.deleteBranch());

    onCase({ ['prune-branches']: true },
        () => branchService.pruneBranches());

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