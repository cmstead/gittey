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
    const prefix = typeof commitData.prefix === 'string'
        ? commitData.prefix.split(' - ')[0]
        : '';
    const name = commitData.commitMessage;
    const separator = prefix.trim() !== ''
        ? commitPrefix.separator
        : '';

    return `${prefix}${separator}${name}`;

}

function getCommitBody(lastBodyContent = null) {
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
            const cleanCommitBodyLine = commitBodyLine.replace(/^(.*)"?$/, '$1');
            
            const commitBody = lastBodyContent === null
                ? cleanCommitBodyLine
                : `${lastBodyContent}${cleanCommitBodyLine}`;

            if(/^.*"$/.test(commitBodyLine)) {
                return commitBody;
            } else {
                return getCommitBody(commitBody);
            }
        });
}

function getCommitInfo(commitPrefixConfig) {
    const validatorPattern = new RegExp(commitPrefixConfig.validator);
    const prefixOptions = getPrefixOptions(commitPrefixConfig);

    let commitTitleLinePrompts = [
        {
            name: 'commitMessage',
            type: 'input',
            message: 'Commit message:',
            validate: createValidator(validatorPattern)
        }
    ];

    if(prefixOptions.length > 0) {
        commitTitleLinePrompts.unshift({
            name: 'prefix',
            message: 'What did you do?',
            type: 'list',
            choices: getPrefixOptions(commitPrefixConfig)
        });
    }

    return inquirer
        .prompt(commitTitleLinePrompts)
        .then(function(commitValues){
            const commitTitle = commitValues.commitMessage.replace(/^"?(.*)"?$/, '$1');

            console.log(`Commit title: ${commitTitle}`)
            
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