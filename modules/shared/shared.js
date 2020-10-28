function createValidator(validatorPattern) {
    return (value) => {
        return !validatorPattern.test(value)
            ? `Input does not match required pattern: ${validatorPattern}`
            : true;
    }
}

module.exports = {
    createValidator
}