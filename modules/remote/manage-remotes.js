const inquirer = require('inquirer');

const { execGitCommand } = require('../shared/git-runner');


function getRemotes() {
    return execGitCommand(`git remote -v`)
        .then(({ stdout }) => stdout
            .trim().split('\n')
            .reduce((remoteMap, line) => {
                const name = line.split(/\s+/)[0];
                remoteMap[name] = name;

                return remoteMap;
            }, {}))
        .then((remoteMap) => Object.keys(remoteMap))

        .catch(function () {
            console.log('Failed to query remote repository names')
        });
}

function setRemoteUri() {
    let remotes = null;

    return getRemotes()
        .then((remotesList) => remotes = remotesList)
        .then(() => inquirer.prompt([
            {
                name: 'remoteName',
                type: 'input',
                default: 'origin',
                message: 'What is the name of your remote repo?'
            },
            {
                name: 'remoteUri',
                type: 'input',
                message: 'What is the URL of your remote repo?'
            }
        ]))
        .then(({ remoteName, remoteUri }) => {
            const command = remotes.includes(remoteName)
                ? `git remote set-url ${remoteName} ${remoteUri}`
                : `git remote add ${remoteName} ${remoteUri}`;

            return execGitCommand(command);
        })

        .catch(function () {
            console.log('Unable to set or update remote URI.')
        });
}

function removeSelectedRemote(remotesList) {
    return inquirer.prompt([
        {
            name: 'remoteToRemove',
            type: 'list',
            choices: remotesList,
            message: 'Which remote do you want to remove?'
        }
    ])
        .then(({ remoteToRemove }) => {
            return execGitCommand(`git remote remove ${remoteToRemove}`);
        })

        .catch(function () {
            console.log('Failed to remove selected remote');
        });
}
function removeRemote() {
    return getRemotes()
        .then((remotesList) => {
            if(remotesList.length > 0) {
                return removeSelectedRemote(remotesList);
            } else {
                return null;
            }
        })

        .catch(function () {
            console.log('Something went wrong while attempting to remove a remote from local git');
        });
}

function listRemotes() {
    return getRemotes()
        .then((remotesList) => {
            console.log(remotesList.join('\n'));
        })

        .catch(function(error){
            console.log('Something failed while trying to read remotes');
        });
}

module.exports = {
    listRemotes,
    removeRemote,
    setRemoteUri
};