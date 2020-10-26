const { match } = require('matchlight');

const configureGittey = require('./modules/setup/configure-gittey');
const cliOptions = require('./modules/config/cli-options');
const branchPrefixes = require('./modules/help/branch-prefixes');

match(cliOptions, function (onCase, onDefault) {
    onCase({ configure: true },
        () => configureGittey
            .configureBranchPrefixes()
            .then(() => console.log('done?')));

    onCase({ ['clear-configuration']: true },
        () => configureGittey.clearConfig());

    onCase({ ['branch-prefixes']: true },
        () => branchPrefixes.displayBranchPrefixes());

    onDefault(() => console.log('Gittey: unknown command, sorry.'));
});