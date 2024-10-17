const inquirer = require('inquirer');
const commandLineArgs = require('command-line-args');

const { createValidator } = require('../shared/shared');
const cliOptions = require('./cli-options-data');
const { execGitCommand } = require('../shared/git-runner');

function buildPrefixOption(branchPrefix, key) {
    return `${key} - ${branchPrefix.prefixes[key]}`;
}

function getPrefixOptions(branchPrefix) {
    return Object.keys(branchPrefix.prefixes)
        .map(function (key) {
            return buildPrefixOption(branchPrefix, key);
        });
}

function buildBranchName(branchData, branchPrefix) {
    const prefix = branchData.prefix ? branchData.prefix.split(' - ')[0] : '';
    const name = branchData.branchName;
    const separator = branchPrefix.separator;
    const branchPrefixCustom = branchPrefix.custom;

    return `${prefix}${branchPrefixCustom.prefix}${branchData.prefixCustom}${branchPrefixCustom.suffix}${separator}${name}`;

}

function parseCliArgs(cliOptions, args) {
    return commandLineArgs(cliOptions, { stopAtFirstUnknown: true, argv: args });
}

function getBranchInfo(branchPrefixConfig, args) {

    const validatorPattern = new RegExp(branchPrefixConfig.validator);
    const prefixOptions = getPrefixOptions(branchPrefixConfig);
    const prefixCustomOption = branchPrefixConfig.custom;


    const { prefix: prefixKey } = parseCliArgs(cliOptions, args)

    let prompts = [
        {
            name: 'branchName',
            message: 'Branch name:',
            validate: createValidator(validatorPattern)
        }
    ];

    if(prefixCustomOption && prefixCustomOption.prompt) {
        const customPrefixValidatorPattern = new RegExp(prefixCustomOption.validator);
        prompts.unshift({
            name: 'prefixCustom',
            message: prefixCustomOption.prompt,
            type: 'input',
            validate: createValidator(customPrefixValidatorPattern)
        });        
    }

    if(prefixOptions.length > 0) {
        const prefixPrompt = {
            name: 'prefix',
            message: 'What are you working on?',
            type: 'list',
            choices: getPrefixOptions(branchPrefixConfig)
        }

        if(typeof branchPrefixConfig.prefixes[prefixKey] !== 'undefind') {

            const prefixDefault = buildPrefixOption(branchPrefixConfig, prefixKey);

            prefixPrompt.default = prefixDefault;
        }

        prompts.unshift(prefixPrompt)
    }

    return inquirer.prompt(prompts);
}

function createNewBranch(branchName) {
    const gitCommand = `git checkout -b ${branchName}`;

    return execGitCommand(gitCommand)
        .then(() => branchName);
}

module.exports = {
    buildBranchName,
    createNewBranch,
    getBranchInfo
}