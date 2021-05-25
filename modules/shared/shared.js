function createValidator(validatorPattern) {
    return (value) => {
        return !validatorPattern.test(value.split('\n')[0])
            ? `Input does not match required pattern: ${validatorPattern}`
            : true;
    }
}

module.exports = {
    createValidator
}