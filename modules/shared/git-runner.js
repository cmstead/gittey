const { promisify } = require('util');
const { exec } = require('child_process');

const { getCliOptions } = require('../config/cli-options-service');
const { getConfig } = require('../config/config-service');

const asyncExec = promisify(exec);

function execGitCommand(command) {
    const cliOptions = getCliOptions();
    const config = getConfig();

    if (cliOptions.verbose || config.verboseMode) {
        console.log(`Git Command: \`${command}\`\n`);
    }

    return asyncExec(command);
}

module.exports = {
    execGitCommand
};