const NpmApi = require('npm-api');
const compareVersions = require('compare-versions');

function getLatestVersion() {
    const npm = new NpmApi();

    return npm
        .repo('gittey')
        .package()
        .then(function(packageContent){
            return packageContent.version;
        })
        .catch(function(error){
            return '0.0.0';
        });
}

function checkForUpdate(localVersion) {
    getLatestVersion()
    .then(function(latestVersion){
        const versionIsNewer = compareVersions(latestVersion, localVersion);

        if (versionIsNewer) {
            console.log();
            console.log('************************************************');
            console.log();
            console.log('A newer version of Gittey is available!');
            console.log();
            console.log(`Your version: ${localVersion}`);
            console.log(`Latest version: ${latestVersion}`);
            console.log();
            console.log('Run `gittey update` to get the latest version.');
            console.log();
            console.log('************************************************');
            console.log();
        }
    })
    .catch(function(){
        // do nothing -- version check should not interfere
        // with proper function
    });
}

module.exports = {
    checkForUpdate
}

