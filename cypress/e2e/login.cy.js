import Login from "../pages/login.page";
import testdata from "../fixtures/login.json";

describe("Login fuction", () => {
  beforeEach(() => {
    Login.visit();
  });

  it("TC-001: verify login if no email is entered should display error messsage", () => {
    Login.enterPassword(testdata.valid_password);
    Login.submit();
    Login.findRequiredField("#email-error", "This is a required field.");
  });

  it("TC-002: verify login if no password is entered should display error messsage", () => {
    Login.enterEmail(testdata.email);
    Login.submit();
    Login.findRequiredField("#pass-error", "This is a required field.");
  });

  it("TC-003: verify login fuction with invalid credential", () => {
    Login.enterEmail(testdata.email);
    Login.enterPassword(testdata.invalid_password);
    Login.submit();
    Login.findMessage(
      "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."
    );
  });

  it("TC-004: verify login fuction with valid credential", () => {
    Login.enterEmail(testdata.email);
    Login.enterPassword(testdata.valid_password);
    Login.submit();
    Login.verifyUrl();
  });

  it.only("TC-005: verify Forgot Your Password fuction", () => {
    Login.clickForgotPassword();
    Login.enterEmailForForgotPassword(testdata.email);
    Login.submitForgotPassword();
    Login.findMessage(
      "If there is an account associated with testRBS1@gmail.com you will receive an email with a link to reset your password."
    );
  });
});
