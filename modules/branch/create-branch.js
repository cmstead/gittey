const childProcess = require('child_process');
const { promisify } = require('util');

const inquirer = require('inquirer');

const configService = require('../config/config-service');

const { createValidator } = require('../shared/shared');
const { branchPrefix } = configService.getConfig();

function buildPrefixOption(key) {
    return `${key} - ${branchPrefix.prefixes[key]}`;
}

function getPrefixOptions() {
    return Object.keys(branchPrefix.prefixes)
        .map(function (key) {
            return buildPrefixOption(key);
        });
}

function buildBranchName(branchData, branchPrefix) {
    const prefix = branchData.prefix.split(' - ')[0];
    const name = branchData.branchName;
    const separator = branchPrefix.separator;

    return `${prefix}${separator}${name}`;

}

function getBranchInfo(branchPrefixConfig) {
    const validatorPattern = new RegExp(branchPrefixConfig.validator);
    const prefixOptions = getPrefixOptions(branchPrefixConfig);

    let prompts = [
        {
            name: 'branchName',
            message: 'Branch name:',
            validate: createValidator(validatorPattern)
        }
    ];

    if(prefixOptions.length > 0) {
        const prefixPrompt = {
            name: 'prefix',
            message: 'What are you working on?',
            type: 'list',
            choices: getPrefixOptions(branchPrefixConfig)
        }

        if(args.length > 1 
            && args[0] === '--prefix' 
            && typeof branchPrefix.prefixes[args1] !== 'undefind') {

            const prefixDefault = buildPrefixOption(args[1]);

            prefixPrompt.default = prefixDefault;
        }

        prompts.unshift(prefixPrompt)
    }

    return inquirer.prompt(prompts);
}

function createNewBranch(branchName) {
    const gitCommand = `git checkout -b ${branchName}`;

    return promisify(childProcess.exec)
        .call(null, gitCommand)
        .then(() => branchName);
}

module.exports = {
    buildBranchName,
    createNewBranch,
    getBranchInfo
}