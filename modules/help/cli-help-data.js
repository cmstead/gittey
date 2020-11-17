const options = require('../config/cli-options-data');
const chalk = require('chalk');

function byName(a, b) {
    if(a.name < b.name) {
        return -1;
    } else if(a.name > b.name) {
        return 1
    } else {
        return 0;
    }
}

module.exports = [
    {
        header: 'Gittey - Unify Your Git Strategy',
        content: "Gittey is a tool to help you and your team customize your Git workflow to best match your day to day needs. Gittey comes with a number of tools out of the box, including branch, and commit prefix annotations and simplified branch management tools."
    },
    {
        header: 'Usage',
        content: `gittey ${chalk.bold('<option-flag>')} [--args arg1 arg2 arg3 ...]`
    },
    {
        header: 'CLI Options',
        optionList: options.sort(byName)
    }
];