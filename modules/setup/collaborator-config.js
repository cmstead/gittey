const inquirer = require('inquirer');

const configService = require('../config/config-service');

function addCollaborator() {
    let collaborators = configService.getConfigProperty('collaborators');

    return inquirer.prompt([
        {
            name: 'collaborator',
            message: 'Collaborator\'s name:',
        	validate: (collaborator) => {
                return collaborator.length > 0;
            }
        }
    ])
    
    .then(({collaborator}) => 
        configService.updateConfig(
            'collaborators',
            collaborators.concat(collaborator)));
}

module.exports = {
    addCollaborator
}