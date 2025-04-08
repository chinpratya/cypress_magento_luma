import Register from "../pages/register.page";
import testdata from "../fixtures/register.json";

describe("Register function", () => {
  beforeEach(() => {
    Register.visit();
  });

  it("Check if the password and confirmation password do not match should display warning", () => {
    Register.enterInfo(
      testdata.firstname,
      testdata.lastname,
      testdata.email,
      testdata.valid_password_format,
      testdata.invalid_password_format
    );
    Register.submit();
    Register.verifyConfirmPasswordWarningMessage(
      "Please enter the same value again."
    );
  });

  it("create account with short password should display warning", () => {
    Register.enterInfo(
      testdata.firstname,
      testdata.lastname,
      testdata.email,
      testdata.short_password_format,
      testdata.short_password_format
    );
    Register.submit();
    Register.verifyPasswordWarningMessage(
      "Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored."
    );
  });

  it("create account with invalid password format should display warning message", () => {
    Register.enterInfo(
      testdata.firstname,
      testdata.lastname,
      testdata.email,
      testdata.invalid_password_format,
      testdata.invalid_password_format
    );
    Register.submit();
    Register.verifyPasswordWarningMessage(
      "Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters."
    );
  });

  it("create account with already account should display warning message", () => {
    Register.enterInfo(
      testdata.firstname,
      testdata.lastname,
      testdata.email,
      testdata.valid_password_format,
      testdata.valid_password_format
    );
    Register.submit();
    Register.verifyWarningMessage(
      "There is already an account with this email address."
    );
  });

  it("create account with valid password format should go to account page", () => {
    const randomEmail = `test${Math.floor(Math.random() * 100000)}@email.com`;
    Register.enterInfo(
      testdata.firstname,
      testdata.lastname,
      randomEmail,
      testdata.valid_password_format,
      testdata.valid_password_format
    );
    Register.submit();
    Register.verifyUrl();
  });
});
