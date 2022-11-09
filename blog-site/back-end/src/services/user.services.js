module.exports = {
  checkValid(isValid, pathVal, messageVal) {
    if (!isValid) {
      throw {
        errors: [
          {
            path: pathVal,
            message: messageVal,
          },
        ],
      };
    }
  },

  catchError(error) {
    const errors = {};
    error.errors.forEach(({ message, path }) => {
      errors[path] = message;
    });
    return errors;
  },
};
