function readJsonFile(filePath) {
    try {
        const configString = fs.readFileSync(filePath, { encoding: 'utf8' });
        return JSON.parse(configString);
    } catch (e) {
        console.log(`Unable to read file at path "${filePath}"`, e);
    }
}

function writeJsonFile(filePath, json) {
    try {
        const configString = JSON.stringify(json, null, 4);
        fs.writeFileSync(filePath, configString);
    } catch (e) {
        console.log(`Unable to write to file path: "${filePath}"`, e)
    }
}

function isFile(filePath) {
    try {
        return fs.lstatSync(filePath).isFile();
    } catch (e) {
        return false;
    }
}

module.exports = {
    isFile,
    readJsonFile,
    writeJsonFile
}