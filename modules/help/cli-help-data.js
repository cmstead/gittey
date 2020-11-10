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
        content: "Gittey is a Git tool to help simplify the task of unifying a team git strategy. The vision of this tool is to augment the Git work done at the command line, rather than simply wrapping it."
    },
    {
        header: 'Usage',
        content: `gittey ${chalk.bold('<option-flag>')}`
    },
    {
        header: 'CLI Options',
        optionList: options.sort(byName)
    }
];