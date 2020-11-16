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
    .then(function({ aliasName, aliasCommand}){
        return {
            name: aliasName,
            command: aliasCommand
        }
    })
    .catch(function(error){
        console.log('Cannot create new alias. Something went wrong');
    });
}

function getCurrentAliases() {
    return configService.getConfigProperty('aliases') || [];
}

function addAlias() {
    return getNewAlias()
        .then(function(aliasObject){
            return getCurrentAliases().concat(aliasObject);
        })
        .then(function(allAliases){
            configService.updateConfig('aliases', allAliases)
        });
}

module.exports = {
    addAlias
};