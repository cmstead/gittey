const childProcess = require('child_process');
const { promisify } = require('util');

const inquirer = require('inquirer');

function getPrefixOptions(commitPrefix) {
    return Object.keys(commitPrefix.prefixes)
        .map(function (key) {
            return `${key} - ${commitPrefix.prefixes[key]}`;
        });
}

function buildCommitMessage(commitData, commitPrefix) {
    const prefix = commitData.prefix.split(' - ')[0];
    const name = commitData.commitMessage;
    const separator = commitPrefix.separator;

    return `${prefix}${separator}${name}`;

}

function getCommitInfo(commitPrefix) {
    const validatorPattern = new RegExp(commitPrefix.validator);

    return inquirer.prompt([
        {
            name: 'prefix',
            message: 'What did you do?',
            type: 'list',
            choices: getPrefixOptions(commitPrefix)
        },
        {
            name: 'commitMessage',
            message: 'Commit message:',
            validate: (commitMessage) => {
                return validatorPattern.test(commitMessage);
            }
        }
    ]);
}

function createNewCommit(commitMessage) {
    const gitCommand = `git commit -m "${commitMessage}"`;

    return promisify(childProcess.exec)
        .call(null, gitCommand)
        .then(() => commitMessage);
}

module.exports = {
    buildCommitMessage,
    createNewCommit,
    getCommitInfo
}