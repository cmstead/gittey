const childProcess = require('child_process');
const util = require('util');

const inquirer = require('inquirer');

const commitService = require('../commit/commit-service');

// git log --pretty=oneline -20
// git revert --no-commit [list of hashes]

const exec = util.promisify(childProcess.exec);

const logLinePattern = /^([^\s]+)\s(.*)/;

function getLatestLogs() {
    const gitCommand = 'git log --pretty=online -20';

    return exec(gitCommand)
        .then(function (result) {
            const lines = result.split('\n').map(line => line.trim());
            return lines.map(function (line) {
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
    inquirer.prompt([
        {
            name: 'selectedCommits',
            message: 'Select commits to revert:',
            type: 'checkbox',
            choices: logs.map((log, index) => `${index + 1} - ${log.description}`);
        }
    ])
        .then(function ({ selectedCommits }) {
            return selectedCommits.map(commit => {
                const index = parseInt(commit.split(' - ')[0]);
                return logs[index];
            });
        });
}


function revert(selectedCommits) {
    const commitHashes = selectedCommits.map(commit => commit.hash).join(' ');
    const gitCommand = `git revert --no-commit ${commitHashes}`;

    return exec(gitCommand);
}

function commitRevert() {
    return commitService.createCommit();
}

