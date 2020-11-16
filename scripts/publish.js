const childProcess = require('child_process');
const util = require('util');

const exec = util.promisify(childProcess.exec);

const versionType = process.argv.slice(2)[0];

exec(`npm version ${versionType}`)
.then(function(){
    return exec(`npm publish`);
})
.catch(function(error){
    console.log('Failed to publish', error);
});