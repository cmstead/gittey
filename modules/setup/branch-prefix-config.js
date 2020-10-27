const inquirer = require("inquirer");
const { match } = require('matchlight');

function getPrefixSetup() {
    return inquirer
        .prompt([
            {
                name: "prefixSeparator",
                message: "Separator between prefix and branch name [enter for none]",
            },
            {
                name: 'prefixValidator',
                message: 'Prefix validation pattern (regex only) [enter for none]'
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

function getBranchPrefixConfig() {
    let config = {
        separator: "",
        validator: "",
        prefixes: {}
    };

    return getPrefixSetup()
        .then(function (answers) {
            config.separator = answers.prefixSeparator;
            config.validator = answers.prefixValidator;

            return getPrefixes({});
        })
        .then(function (prefixes) {
            config.prefixes = prefixes;

            return config;
        });
}

module.exports = {
    getBranchPrefixConfig
};