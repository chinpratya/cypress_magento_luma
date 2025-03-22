class Register {
  loginUrl =
    "https://magento.softwaretestingboard.com/customer/account/create/";

  visit() {
    cy.visit(this.loginUrl);
  }
}

export default new Register();
