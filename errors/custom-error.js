class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message); // constructor of the child Error being extended
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

new CustomAPIError();

module.exports = { createCustomError, CustomAPIError };
