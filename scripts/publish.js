const childProcess = require('child_process');
const util = require('util');

const exec = util.promisify(childProcess.exec);

const versionType = process.argv.slice(2)[0];

exec(`npm version ${versionType}, { stdio: "inherit" }`)
.then(function(){
    return exec(`npm publish`, { stdio: "inherit" });
})
.catch(function(error){
    console.log('Failed to publish', error);
});