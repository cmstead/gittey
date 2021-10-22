const inquirer = require("inquirer");

const { updateConfig } = require('../config/config-service');

const ON = 'On';
const OFF = 'Off';

function setVerboseMode() {
    return inquirer.prompt([
        {
            name: 'verboseMode',
            type: 'list',
            choices: [
                ON,
                OFF
            ],
            message: 'Set verbose mode to:'
        }
    ])
        .then(({ verboseMode }) => {
            updateConfig('verboseMode', verboseMode === ON);
        })

        .catch(function (error) {
            console.log(`Unable to update verbose mode setting: ${error.message}`);
        });
}

module.exports = {
    setVerboseMode
};