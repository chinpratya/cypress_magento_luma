class Search {
  Url = "https://magento.softwaretestingboard.com";
  locatorInputSearch = "#search";

  visit() {
    cy.visit(this.Url);
  }

  enterSearchInput(text) {
    cy.get(this.locatorInputSearch).type(`${text}{enter}`);
  }

  searchValidCase(searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    cy.get(".item.product.product-item").should("have.length.greaterThan", 0);
    cy.get(".item.product.product-item").contains(regex).should("be.visible");
  }

  searchNoResultCases(message) {
    cy.get(".message.notice").should("be.visible").and("contain.text", message);
  }

  selectSortBy(key) {
    cy.get("#sorter").select(key);
  }

  verifySortByName() {
    cy.get(".item.product.product-item").should("have.length.greaterThan", 0);

    cy.get(".product-item-link").then((item) => {
      let Product = [];
      item.map((index, el) => {
        if (el.innerText.length > 0) {
          Product.push(el.innerText);
        }
        return;
      });
      const sortedProduct = [...Product].sort();

      expect(Product).to.deep.equal(sortedProduct);
    });
  }

  verifySortByPrice() {
    cy.get(".item.product.product-item").should("have.length.greaterThan", 0);

    cy.get(".price").then((item) => {
      let Product = [];
      item.map((index, el) => {
        if (el.innerText.length > 0) {
          Product.push(parseFloat(el.innerText.substring(1)).toFixed(2));
        }
        return;
      });
      const sortedProduct = [...Product].sort().reverse();

      expect(Product).to.deep.equal(sortedProduct);
    });
  }
}

export default new Search();
