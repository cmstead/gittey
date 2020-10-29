const commandLineUsage = require('command-line-usage');

const helpData = require('./cli-help-data');

module.exports = {
    display: function () {
        const helpOutput = commandLineUsage(helpData);

        console.log(helpOutput);
    }
}