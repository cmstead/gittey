const chalk = require('chalk');

const buildCliOptions = require('../config/cli-options');
const configService = require('../config/config-service');

function getCliOptions(aliases) {
    try {
        return buildCliOptions(aliases);
    } catch (e) {
        console.log('');
        console.log(chalk.bold('Whoops! That command doesn\'t exist, here is what Gittey can do:'));

        return {
            help: true
        };
    }

}

function getAliases() {
    const gitteyConfig = configService.getConfig();
    return gitteyConfig.aliases || [];
}

module.exports = {
    getAliases,
    getCliOptions
}