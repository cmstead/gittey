const { promisify } = require('util');
const { exec } = require('child_process');

const { getCliOptions } = require('../config/cli-options-service');

const asyncExec = promisify(exec);

function execGitCommand(command) {
    const cliOptions = getCliOptions();

    if (cliOptions.verbose) {
        console.log(`Git Command: \`${command}\`\n`);
    }

    return asyncExec(command);
}

module.exports = {
    execGitCommand
};