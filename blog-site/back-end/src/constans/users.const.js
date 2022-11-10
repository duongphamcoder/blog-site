module.exports = {
  REQUIRE_MESSAGE: {
    path: "message",
    message: "Username or password is required",
  },
  NOT_MATCHING: {
    path: "message",
    message: "Username or password is not matching",
  },
  USER_BANNED: {
    path: "message",
    message: "User is banned",
  },
  NOT_EMPTY: (field, fieldName) => {
    return {
      path: field,
      message: `${fieldName} cannot be blank`,
    };
  },
  LENGTH_REQUIRE: (field, fieldName, min, max) => {
    return {
      path: field,
      message: `${fieldName} must be between ${min} and ${max} characters`,
    };
  },
  ONLY_TEXT: (field, fieldName) => {
    return {
      path: field,
      message: `${fieldName} only contain letters`,
    };
  },
  EMAIL_INVALID: {
    path: "email",
    message: "Email is invalid",
  },
  USERNAME_EXISTS: {
    path: "username",
    message: "Username are already in use",
  },
  ONLY_NUMBER(field, fieldName) {
    return {
      path: field,
      message: `${fieldName} must be number`,
    };
  },
};
