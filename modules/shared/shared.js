function createValidator(validatorPattern) {
    return (value) => {
        return !validatorPattern.test(value.replace('"', ''))
            ? `Input does not match required pattern: ${validatorPattern}`
            : true;
    }
}

module.exports = {
    createValidator
}