class LoginPage {
  loginUrl = "https://magento.softwaretestingboard.com/customer/account/login";
  locatorEmail = "#email";
  locatorPassword = "#pass";
  locatorLoginBtn = "#send2";
  locatorForgotPassword =
    "a[href='https://magento.softwaretestingboard.com/customer/account/forgotpassword/']";
  locatorForgotPasswordEmail = "#email_address";
  submitForgotBtn = "[class='action submit primary']";

  visit() {
    cy.visit(this.loginUrl);
  }

  enterEmail(email) {
    cy.get(this.locatorEmail).type(email);
  }

  enterPassword(password) {
    cy.get(this.locatorPassword).type(password);
  }

  findMessage(message) {
    cy.contains(message).should("be.visible");
  }

  findRequiredFieldMessage(locator, message) {
    cy.get("body").then(($body) => {
      if ($body.find(locator).length > 0) {
        cy.get(locator).should("be.visible").and("have.text", message);
      } else {
        cy.get(".message-error").should("be.visible");
      }
    });
  }

  submit() {
    cy.get(this.locatorLoginBtn).click();
  }

  verifyUrl() {
    cy.url().should("not.eq", this.loginUrl);
  }

  clickForgotPassword() {
    cy.contains("a", "Forgot Your Password?").click();
  }

  enterEmailForForgotPassword(email) {
    cy.get(this.locatorForgotPasswordEmail).type(email);
  }

  submitForgotPassword() {
    cy.get(this.submitForgotBtn).click();
  }
}

export default new LoginPage();
