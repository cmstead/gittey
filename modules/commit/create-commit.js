const childProcess = require('child_process');
const { promisify } = require('util');

const inquirer = require('inquirer');

const { createValidator } = require('../shared/shared');
const configService = require('../config/config-service');

const exec = promisify(childProcess.exec);

function getPrefixOptions() {
    const { commitPrefix } = configService.getConfig();

    return Object.keys(commitPrefix.prefixes)
        .map(function (key) {
            return `${key} - ${commitPrefix.prefixes[key]}`;
        });
}

function buildCommitMessage(commitData) {
    const { commitPrefix } = configService.getConfig();

    const prefix = typeof commitData.prefix === 'string'
        ? commitData.prefix.split(' - ')[0]
        : '';
    const originalCommitMessage = commitData.commitMessage;
    const separator = prefix.trim() !== ''
        ? commitPrefix.separator
        : '';

    const collaboratorInfo = Array.isArray(commitData.collaborators) && commitData.collaborators.length > 0
        ? `\n\n${commitData.collaborators.map(name => `Co-authored-by: ${name}`).join('\n')}`
        : '';

    return `${prefix}${separator}${originalCommitMessage}${collaboratorInfo}`;

}

function getCommitBody(lastBodyContent = '') {
    const commitBodyPrompts = [
        {
            name: 'commitBodyLine',
            type: 'input',
            message: '>>'
        }
    ];

    return inquirer
        .prompt(commitBodyPrompts)
        .then(function({ commitBodyLine }) {
            const cleanCommitBodyLine = commitBodyLine.replace(/"$/, '');

            const commitBody = lastBodyContent === null
                ? cleanCommitBodyLine
                : `${lastBodyContent}\n${cleanCommitBodyLine}`;

            if(/^.*"$/.test(commitBodyLine)) {
                return commitBody;
            } else {
                return getCommitBody(commitBody);
            }
        });
}

function getCommitInfo() {
    const { commitPrefix, collaborators } = configService.getConfig();

    const validatorPattern = new RegExp(commitPrefix.validator);
    const prefixOptions = getPrefixOptions();

    let commitTitleLinePrompts = [
        {
            name: 'commitMessage',
            type: 'input',
            message: 'Commit message:',
            validate: createValidator(validatorPattern)
        }
    ];

    if(collaborators.length > 0) {
        commitTitleLinePrompts.unshift({
            name: 'collaborators',
            message: 'Who collaborated on this commit?',
            type: 'checkbox',
            choices: collaborators
        });
    }

    if(prefixOptions.length > 0) {
        commitTitleLinePrompts.unshift({
            name: 'prefix',
            message: 'What did you do?',
            type: 'list',
            choices: prefixOptions
        });
    }

    return inquirer
        .prompt(commitTitleLinePrompts)
        .then(function(commitValues){
            const commitTitle = commitValues.commitMessage.replace(/^"?(.*)"?$/, '$1');

            if(/^".*[^"]$/.test(commitValues.commitMessage)) {
                return getCommitBody()
                    .then(commitBody => `${commitTitle}${commitBody}`)
                    .then(commitMessage => {
                        commitValues.commitMessage = commitMessage
                        return commitValues;
                    });
            } else {
                commitValues.commitMessage = commitTitle;
                return commitValues;
            }
        });
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
            const fileStatuses = result.stdout.split('\n')

            return Boolean(fileStatuses.find(value => /^.[^\s]/.test(value)));
        })
        .catch(function (error) {
            console.log('Unable to check for unstaged files', error);

            return false;
        });
}

function areThereChangesToCommit() {
    const gitCommand = 'git status --porcelain';

    return exec(gitCommand)
        .then(function (result) {
            return result.stdout.trim() !== '';
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
            return result.stageFiles.toLowerCase() === 'y';
        });
}

function stageFiles() {
    const gitCommand = 'git add --all';

    return exec(gitCommand);
}

function showStatus() {
    const gitCommand = 'git status --short';

    return exec(gitCommand);
}

module.exports = {
    areThereChangesToCommit,
    areThereUnstagedFiles,
    buildCommitMessage,
    createNewCommit,
    getCommitInfo,
    showStatus,
    stageFiles,
    verifyUserWantsToStageFiles
}