const inquirer = require("inquirer");
const { match } = require('matchlight');
const arloPrefixes = require('../../default-configurations/arlo-notation.json');
const simpleArloPrefixes = require('../../default-configurations/simplified-arlo-notation.json');
const conventionalCommits = require('../../default-configurations/simplified-conventional-commits.json');

function getPrefixSetup() {
    return inquirer
        .prompt([
            {
                name: "prefixSeparator",
                message: "Separator between prefix and commit message",
                default: ' '
            },
            {
                name: 'messageValidator',
                message: 'Message validation pattern (regex only)',
                default: '^.{1,45}$'
            }
        ]);
}

function getPrefixDescription() {
    return inquirer
        .prompt([
            {
                name: "prefixDescription",
                message: "Prefix description",
                validate: (prefixDescription) => {
                    return prefixDescription.length > 0;
                }
            }
        ]);
}

function getPrefix() {
    let result = {};

    return inquirer
        .prompt([
            {
                name: "prefix",
                message: "Prefix [leave blank to quit]",
            }
        ])
        .then(function (answers) {
            result = answers;

            return match(answers.prefix, function(onCase, onDefault) {
                onCase("", () => null);
                onDefault(() => getPrefixDescription());
            });
        })
        .then(function (answers) {
            result.description = answers ? answers.prefixDescription : undefined;

            return match(answers, function(onCase, onDefault) {
                onCase(null, () => null);
                onDefault(() => result);
            });
        });
}

function attachPrefix(prefixes, prefixData) {
    if (prefixData !== null) {
        prefixes[prefixData.prefix] = prefixData.description;
    }
}

function getPrefixes(prefixes) {
    return getPrefix()
        .then(function (prefixData) {
            attachPrefix(prefixes, prefixData);

            return match(prefixData, function(onCase, onDefault) {
                onCase(null, () => prefixes);
                onDefault(() => getPrefixes(prefixes));
            });
        });
}

function getPrefixPreference() {
    return inquirer.prompt([
        {
            name: 'prefixPreference',
            message: 'Choose your preferred prefix scheme',
            type: 'list',
            choices: [
                'Arlo Commit Annotations',
                'Simplified Arlo Commit Annotations',
                'Simplified Conventional Commits',
                'Custom Annotations'
            ]
        }
    ]);
}

function getCommitPrefixConfig() {
    let config = {
        separator: "",
        validator: "",
        prefixes: {}
    };

    return getPrefixSetup()
        .then(function (answers) {
            config.separator = answers.prefixSeparator;
            config.validator = answers.messageValidator;

            return getPrefixPreference();
        })
        .then(function(result){
            const prefixPreference = result.prefixPreference.toLowerCase();

            if(prefixPreference.includes('simplified')) {
                return simpleArloPrefixes;
            }
            else if(prefixPreference.includes('arlo')) {
                return arloPrefixes;
            } else if (prefixPreference.includes('conventional')) {
                return conventionalCommits;
            }else {
                return getPrefixes({});
            }
        })
        .then(function (prefixes) {
            config.prefixes = prefixes;

            return config;
        });
}

module.exports = {
    getCommitPrefixConfig
};