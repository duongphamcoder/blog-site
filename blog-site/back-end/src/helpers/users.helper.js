const messages = require("../constans/users.const");
const {
  ONLY_TEXT_REGEX,
  EMAIL_REGEX,
  PHONE_NUMBER_REGEX,
} = require("../constans/regex.const");
const { User } = require("../models/index");

class UserValidation {
  constructor() {
    this.errors = [];
  }

  handleAddNewError(error) {
    this.errors.push(error);
  }

  signinValidation(isValid, error) {
    this.errors = [];
    if (!isValid) {
      this.handleAddNewError(error);
      throw { errors: this.errors };
    }
  }

  async validateSignup(data) {
    this.errors = [];
    this.validateName(data["firstName"], "firstName", "First name");
    this.validateName(data["lastName"], "lastName", "Last name");
    await this.validateUsername(data["username"], "username", "Username");
    this.validateEmail(data["email"], "email", "Email");
    this.validatePhoneNumber(
      data["phoneNumber"],
      "phoneNumber",
      "Phone number"
    );
    this.validateAddress(data["address"], "address", "Address");
    if (this.errors.length) {
      return Promise.reject({ errors: this.errors });
    }
  }

  validateName(nameValue, field, fieldName) {
    const minLen = 1;
    const maxLen = 15;
    const name = nameValue.trim();
    let isValid =
      this.checkEmptyValue(name, messages["NOT_EMPTY"](field, fieldName)) ||
      this.checkRegexValue(
        nameValue,
        ONLY_TEXT_REGEX,
        messages["ONLY_TEXT"](field, fieldName)
      )
        ? false
        : true;
    if (!isValid) {
      this.checkLengthValue(
        name,
        minLen,
        maxLen,
        messages["LENGTH_REQUIRE"](field, fieldName, minLen, maxLen)
      );
    }
  }

  async validateUsername(usernameValue, field, fieldName) {
    const minLen = 3;
    const maxLen = 30;
    const username = usernameValue.trim();
    const isValid =
      this.checkEmptyValue(username, messages["NOT_EMPTY"](field, fieldName)) ||
      this.checkLengthValue(
        username,
        minLen,
        maxLen,
        messages["LENGTH_REQUIRE"](field, fieldName, minLen, maxLen)
      )
        ? false
        : true;
    if (isValid) {
      const user = await User.findOne({
        where: { username: username },
        attributes: ["username"],
      });
      if (user) {
        this.handleAddNewError(messages["USERNAME_EXISTS"]);
      }
    }
  }

  validateEmail(emailValue, field, fieldName) {
    const email = emailValue.trim();
    const isValid = !this.checkEmptyValue(
      email,
      messages["NOT_EMPTY"](field, fieldName)
    );
    if (isValid) {
      this.checkRegexValue(emailValue, EMAIL_REGEX, messages["EMAIL_INVALID"]);
    }
  }

  validatePhoneNumber(inputValue, field, fieldName) {
    const minLen = 10;
    const maxLen = 12;
    const phoneNumber = inputValue.trim();
    const checkEmptyValue = this.checkEmptyValue(
      phoneNumber,
      messages["NOT_EMPTY"](field, fieldName)
    );
    const checkRegex = this.checkRegexValue(
      phoneNumber,
      PHONE_NUMBER_REGEX,
      messages["ONLY_NUMBER"](field, fieldName)
    );
    if (checkRegex && checkEmptyValue) {
      this.checkLengthValue(
        phoneNumber,
        minLen,
        maxLen,
        messages["LENGTH_REQUIRE"](field, fieldName, minLen, maxLen)
      );
    }
  }

  validateAddress(inputValue, field, fieldName) {
    const minLen = 3;
    const maxLen = 100;
    const address = inputValue.trim();
    const isValid = !this.checkEmptyValue(
      address,
      messages["NOT_EMPTY"](field, fieldName)
    );
    if (isValid) {
      this.checkLengthValue(
        address,
        minLen,
        maxLen,
        messages["LENGTH_REQUIRE"](field, fieldName, minLen, maxLen)
      );
    }
  }

  checkEmptyValue(value, error) {
    const isInvalid = value.length ? false : true;
    if (isInvalid) {
      this.handleAddNewError(error);
    }
    return isInvalid;
  }

  checkLengthValue(value, minLen, maxLen, error) {
    const isInvalid =
      value.length < minLen || value.length > maxLen ? true : false;
    if (isInvalid) {
      this.handleAddNewError(error);
    }
    return isInvalid;
  }

  checkRegexValue(value, regex, error) {
    const isInvalid = !regex.test(value);
    if (isInvalid) {
      this.handleAddNewError(error);
    }
    return isInvalid;
  }
}

module.exports = new UserValidation();
