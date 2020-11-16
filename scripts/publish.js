const childProcess = require('child_process');
const util = require('util');

const exec = util.promisify(childProcess.exec);

const versionType = process.argv.slice(2)[0];

childProcess.execSync(`npm version ${versionType}`, { stdio: "inherit" });
childProcess.execSync(`npm publish`, { stdio: "inherit" });
