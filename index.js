#!/usr/bin/env node

const childProcess = require('child_process');

const { match } = require('matchlight');

const package = require('./package.json');

const { configureBranchPrefixes, configureCollaborators, configureCommitPrefixes, clearConfig } = require('./modules/setup/configure-gittey');
const aliasConfig = require('./modules/setup/alias-config');
const { addCollaborator, removeCollaborators } = require('./modules/setup/collaborator-config');
const branchPrefixes = require('./modules/help/branch-prefixes');
const branchService = require('./modules/branch/branch-service');
const cloneService = require('./modules/clone/clone-service');
const commitPrefixes = require('./modules/help/commit-prefixes');
const commitService = require('./modules/commit/commit-service');
const helpOutput = require('./modules/help/help-output');

const { checkForUpdate } = require("./modules/runtime/version-service");
const { registerUserCommands } = require('./modules/user-commands/user-commands-service');
var { revertCommits } = require('./modules/revert/revert-service');
const { setRemoteUri, removeRemote, listRemotes } = require('./modules/remote/manage-remotes');
const { renameCurrentBranch } = require('./modules/branch/rename-current-branch');
const { initRepo } = require('./modules/init/init-repo');
const { loadCliOptions } = require('./modules/config/cli-options-service');

const { aliases, cliOptions, args } = loadCliOptions();

new Promise(function (resolve) {
    resolve(true);
})
    .then(function () {
        match(cliOptions, function (onCase, onDefault) {
            onCase({ ['init-repo']: true },
                () => initRepo())

            onCase({ ['rename-branch']: true },
                () => renameCurrentBranch())

            onCase({ ['set-remote-uri']: true },
                () => setRemoteUri());

            onCase({ ['remove-remote']: true },
                () => removeRemote());

            onCase({ ['list-remotes']: true },
                () => listRemotes());

            onCase({ ['add-alias']: true },
                () => aliasConfig.addAlias());

            onCase({ ['delete-alias']: true },
                () => aliasConfig.deleteAlias());

            onCase({ ['new-branch']: true },
                () => branchService.createBranch(args));

            onCase({ ['checkout']: true },
                () => branchService.checkoutBranch(args, cliOptions));

            onCase({ ['commit']: true },
                () => commitService.createCommit());

            onCase({ ['init']: true },
                () => configureBranchPrefixes()
                    .then(() => configureCommitPrefixes())
                    .then(() => configureCollaborators())
                    .then(() => console.log('Gittey has been configured for this project.')));

            onCase({ ['add-collaborator']: true },
                () => addCollaborator());

            onCase({ ['remove-collaborators']: true },
                () => removeCollaborators());

            onCase({ ['clone']: true },
                () => cloneService.clone());

            onCase({ ['configure-branch-annotations']: true },
                () => configureBranchPrefixes()
                    .then(() => console.log('Branch prefixes configured.')));

            onCase({ ['configure-commit-annotations']: true },
                () => configureCommitPrefixes()
                    .then(() => console.log('Commit message prefixes configured.')));

            onCase({ ['reset-configuration']: true },
                () => clearConfig());

            onCase({ ['revert-commits']: true },
                () => revertCommits());

            onCase({ ['update-current-branch']: true },
                () => branchService.updateCurrentBranch());

            onCase({ ['merge-from-branch']: true },
                () => branchService.mergeFromBranch());

            onCase({ ['merge-to-branch']: true },
                () => branchService.mergeToBranch());

            onCase({ ['merge-to-temp']: true },
                () => branchService.mergeToTemp());

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

            onCase({ ['version']: true },
                () => console.log(`v${package.version}`));

            onCase({ ['update']: true },
                () =>
                    childProcess.execSync(`npm install gittey@latest -g`, { stdio: 'inherit' }));

            registerUserCommands(aliases, cliOptions, onCase);

            onDefault(() => {
                console.log('Gittey: unknown command, sorry.');
                helpOutput.display();
                process.exit(1);
            });
        });
    })
    .then(function () {
        if (!cliOptions.update) {
            checkForUpdate(package.version);
        }
    });
