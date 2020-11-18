const childProcess = require('child_process');

function runCommand(command, args) {
    childProcess.execSync(`${command} ${args.join(' ')}`, { stdio: 'inherit' });
}

function runCommandString(commandString, args) {
    commandString
        .split(';')
        .forEach((command) => runCommand(command, args));
}

function registerUserCommands(userCommands, cliOptions, onCase) {
    userCommands.forEach(function (userCommand) {
        onCase({ [userCommand.name]: true }, () => {
            const args = cliOptions.args || [];

            runCommandString(userCommand.command, args);
        });
    });
}

module.exports = {
    registerUserCommands
}