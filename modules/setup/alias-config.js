const inquirer = require('inquirer');

const configService = require('../config/config-service');

function getNewAlias() {
    return inquirer.prompt([
        {
            name: 'aliasName',
            message: 'Name of new command alias',
            validate: (aliasName) => {
                return (/^(?=[^\s]*$)(\w|-)+/g).test(aliasName)
            }
        },
        {
            name: 'aliasCommand',
            message: 'Command to run',
        }
    ])
        .then(function ({ aliasName, aliasCommand }) {
            return {
                name: aliasName,
                command: aliasCommand
            }
        })
        .catch(function (error) {
            console.log('Cannot create new alias. Something went wrong');
        });
}

function getCurrentAliases() {
    return configService.getConfigProperty('aliases') || [];
}

function selectAlias(message = 'Select an alias name') {
    return inquirer.prompt([
        {
            name: 'selectedAlias',
            message: message,
            type: "list",
            choices: getCurrentAliases().map(alias => alias.name)
        }
    ])
        .then(function (result) {
            return result.selectedAlias;
        })
        .catch(function (error) {
            console.log('Cannot select an alias right now.');
        });
}

function deleteAlias() {
    selectAlias('Select an alias to delete')
    .then(function(aliasName){
        return getCurrentAliases().filter(alias => alias.name !== aliasName);
    })
    .then(function(updatedAliases){
        configService.updateConfig('aliases', updatedAliases);
    })
    .catch(function(error){
        console.log('Cannot remove an alias right now.');
    });
}

function addAlias() {
    return getNewAlias()
        .then(function (aliasObject) {
            return getCurrentAliases().concat(aliasObject);
        })
        .then(function (allAliases) {
            configService.updateConfig('aliases', allAliases)
        });
}

module.exports = {
    addAlias,
    deleteAlias
};