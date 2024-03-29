const inquirer = require('inquirer');

const commitService = require('../commit/commit-service');
const { execGitCommand } = require('../shared/git-runner');

const logLinePattern = /^([^\s]+)\s(.*)/;

function areThereUncommittedFiles() {
    const gitCommand = 'git status --porcelain';

    return execGitCommand(gitCommand)
        .then(function (result) {
            const fileStatuses = result.stdout
                .split('\n')
                .filter(line => line.trim() !== '');

            return fileStatuses.length > 0;
        })
        .catch(function (error) {
            console.log('Unable to check for unstaged files', error);

            return false;
        });
}

function getLatestLogs() {
    const gitCommand = 'git log --pretty=oneline -20';

    return execGitCommand(gitCommand)
        .then(function (result) {
            const lines = result.stdout.split('\n').map(line => line.trim());
            return lines
                .filter(line => line.trim() !== '')
                .map(function (line) {
                    const hash = line.replace(logLinePattern, '$1');
                    const description = line.replace(logLinePattern, '$2');

                    return {
                        hash,
                        description
                    }
                });
        })
}

function getCommits(logs) {
    return inquirer.prompt([
        {
            name: 'selectedCommits',
            message: 'Select commits to revert:',
            type: 'checkbox',
            choices: logs.map((log, index) => `${index + 1} - ${log.description}`)
        }
    ])
        .then(function ({ selectedCommits }) {
            return selectedCommits.map(commit => {
                const index = parseInt(commit.split(' - ')[0]);
                return logs[index - 1];
            });
        });
}


function revert(selectedCommits) {
    const commitHashes = selectedCommits.map(commit => commit.hash).join(' ');
    const gitCommand = `git revert --no-commit ${commitHashes}`;

    return execGitCommand(gitCommand);
}

function commitRevert() {
    return commitService.createCommit();
}

function startRevertCommits() {
    return getLatestLogs()
        .then(function (logs) {
            return getCommits(logs);
        })
        .then(function (selectedCommits) {
            return revert(selectedCommits);
        })
        .then(function () {
            return commitRevert();
        });
}

function revertCommits() {
    return areThereUncommittedFiles()
        .then(function (uncommittedFilesExist) {
            if (uncommittedFilesExist) {
                console.log('There are uncommitted files. Cancelling revert.');
            } else {
                return startRevertCommits();
            }
        })
}

module.exports = {
    revertCommits
}