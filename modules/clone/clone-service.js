const childProcess = require('child_process');
const { promisify } = require('util');

const axios = require('axios');
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

function getGitHubRepositoryList(username, page = 1) {
    const listUrl = `https://api.github.com/users/${username}/repos?sort=full_name&per_page=100&page=${page}`;

    return axios
        .get(listUrl)
        .then(function ({ data: repositoryList }) {
            if (repositoryList.length < 100) {
                return repositoryList;
            } else {
                return getGitHubRepositoryList(username, page + 1)
                    .then(function (repositoryRemainder) {
                        return repositoryList.concat(repositoryRemainder);
                    });
            }
        })

}

function buildRepositoryChoices(repositoryList) {
    return repositoryList.map((record, index) => `${index} - ${record.full_name}`);
}

function selectRepository(repositoryList) {
    const repositoryChoices = buildRepositoryChoices(repositoryList);

    return inquirer
        .prompt([
            {
                name: 'selectedRepository',
                message: 'Select a repository to clone',
                type: 'list',
                choices: repositoryChoices
            }
        ])
        .then(function ({ selectedRepository }) {
            const repositoryIndex = selectedRepository.split(' - ')[0];
            return repositoryList[repositoryIndex].clone_url;
        });
}

function getUsername() {
    return inquirer.prompt([
        {
            name: 'username',
            message: 'Gihub user to clone from:'
        }
    ])
        .then(function ({ username }) {
            return username;
        });
}

function cloneUserRepository() {
    return getUsername()
        .then(function (username) {
            console.log('Loading repository list...');
            return getGitHubRepositoryList(username);
        })
        .then(function (repositoryList) {
            return selectRepository(repositoryList);
        })
        .then(function (repositoryUrl) {
            return cloneFromUrl(repositoryUrl);
        })
        .catch(function (error) {
            console.log('Unable to clone from user repository, an error occurred', error);
        });
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

function clone() {
    return inquirer.prompt([
        {
            name: 'cloneOption',
            message: 'Clone a repository -- choose a method:',
            type: 'list',
            choices: [
                '1 - Clone by repository URI',
                '2 - Clone from GitHub user'
            ]
        }
    ])
        .then(function ({ cloneOption }) {
            if (cloneOption.startsWith('1')) {
                return cloneRepository();
            } else {
                return cloneUserRepository();
            }
        });
}

module.exports = {
    clone
};