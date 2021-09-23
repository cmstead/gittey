const { promisify } = require('util');
const { exec } = require('child_process');
const inquirer = require('inquirer');


function getRemotes() {
    return promisify(exec)
        .call(null, `git remote -v`)
        .then(({ stdout }) => stdout
            .trim().split('\n')
            .reduce((remoteMap, line) => {
                const name = line.split(/\s+/)[0];
                remoteMap[name] = name;

                return remoteMap;
            }, {}))
        .then((remoteMap) => Object.keys(remoteMap))

        .catch(function (error) {
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

            return promisify(exec).call(null, command);
        })

        .catch(function () {
            console.log('Unable to set or update remote URI.')
        });
}

module.exports = {
    setRemoteUri
};