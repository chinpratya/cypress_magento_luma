class Register {
  registerUrl =
    "https://magento.softwaretestingboard.com/customer/account/create/";
  accuntpageUrl = "https://magento.softwaretestingboard.com/customer/account/";
  loctorfirstname = "#firstname";
  loctorlastname = "#lastname";
  loctoremail = "#email_address";
  loctorpassword = "#password";
  loctorconfirmPassword = "#password-confirmation";
  loctorSubmitBtn = "button[title='Create an Account']";

  visit() {
    cy.visit(this.registerUrl);
  }

  enterInfo(firstname, lastname, email, password, confirmPassword) {
    cy.get(this.loctorfirstname).type(firstname);
    cy.get(this.loctorlastname).type(lastname);
    cy.get(this.loctoremail).type(email);
    cy.get(this.loctorpassword).type(password);
    cy.get(this.loctorconfirmPassword).type(confirmPassword);
  }

  verifyPasswordWarningMessage(message) {
    cy.get("#password-error").should("be.visible").and("have.text", message);
  }

  verifyConfirmPasswordWarningMessage(message) {
    cy.get("#password-confirmation-error")
      .should("be.visible")
      .and("have.text", message);
  }

  verifyWarningMessage(message) {
    cy.get(".message-error > div")
      .should("be.visible")
      .invoke("text")
      .should("include", message);
  }

  submit() {
    cy.get(this.loctorSubmitBtn).click();
  }

  verifyUrl() {
    cy.url().should("not.eq", this.registerUrl).and("eq", this.accuntpageUrl);
  }
}

export default new Register();
