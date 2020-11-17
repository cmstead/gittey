const childProcess = require('child_process');
const { promisify } = require('util');

const inquirer = require('inquirer');

const { createValidator } = require('../shared/shared');

const exec = promisify(childProcess.exec);

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

function getCommitInfo(commitPrefixConfig) {
    const validatorPattern = new RegExp(commitPrefixConfig.validator);
    const prefixOptions = getPrefixOptions(commitPrefixConfig);

    let prompts = [
        {
            name: 'commitMessage',
            message: 'Commit message:',
            validate: createValidator(validatorPattern)
        }
    ];

    if(prefixOptions.length > 0) {
        prompts.unshift({
            name: 'prefix',
            message: 'What did you do?',
            type: 'list',
            choices: getPrefixOptions(commitPrefixConfig)
        });
    }

    return inquirer.prompt(prompts);
}

function createNewCommit(commitMessage) {
    const gitCommand = `git commit -m "${commitMessage}"`;

    return exec
        .call(null, gitCommand)
        .then(() => commitMessage);
}

function areThereUnstagedFiles() {
    const gitCommand = 'git status --porcelain';

    return exec(gitCommand)
        .then(function (result) {
            console.log(result);

            const fileStatuses = result.stdout.split('\n')

            console.log(fileStatuses.find(value => /^.[^\s]/.test(value)));

            return fileStatuses.find(value => /^.[^\s]/.test(value)) !== null;
        })
        .catch(function (error) {
            console.log('Unable to check for unstaged files', error);

            return false;
        });
}

function verifyUserWantsToStageFiles() {
    return inquirer.prompt([
        {
            name: 'stageFiles',
            message: 'There are unstaged files, add them? [y/N]',
            default: 'n',
            validate: (stageFiles) => {
                return stageFiles.toLowerCase() === 'y'
                    || stageFiles.toLowerCase() === 'n';
            }
        }
    ])
        .then(function (result) {
            return result.stageFiles;
        });
}

function stageFiles() {
    const gitCommand = 'git add --all';

    return exec(gitCommand);
}

module.exports = {
    areThereUnstagedFiles,
    buildCommitMessage,
    createNewCommit,
    getCommitInfo,
    stageFiles,
    verifyUserWantsToStageFiles
}