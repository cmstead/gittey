const childProcess = require('child_process');
const { promisify } = require('util');

const inquirer = require('inquirer');

function getCloneUrl() {
    return inquirer
        .prompt([
            {
                name: 'cloneUrl',
                message: 'What is the URL you want to clone?'
            }
        ])
        .then(function ({ cloneUrl }) {
            return cloneUrl;
        })
        .catch(function (error) {
            console.log('Unable to clone from URL, an error occurred.', error);
        });
}

function getGitHubRepositoryList() {
    
}

function cloneRepository() {
    return getCloneUrl()
        .then(function (cloneUrl) {
            return cloneFromUrl(cloneUrl);
        })
}

function cloneFromUrl(cloneUrl) {
    const gitCommand = `git clone ${cloneUrl}`;

    return promisify(childProcess.exec)
        .call(null, gitCommand);
}

module.exports = {
    cloneRepository
};