class Cart {
  Url = "https://magento.softwaretestingboard.com";

  visit() {
    cy.visit(this.Url);
  }

  addProducttoCart(index = 0) {
    cy.get(".product-item").should("be.visible");
    cy.get(".product-item").eq(index).realHover();
    cy.get(".product-item-link").eq(index).click();

    cy.get("body").then(($body) => {
      if (
        $body.find(
          ".size > .swatch-attribute-options > #option-label-size-143-item-168"
        ).length > 0
      ) {
        cy.get(
          ".size > .swatch-attribute-options > #option-label-size-143-item-168"
        )
          .first()
          .click();
      }

      if (
        $body.find(".swatch-attribute.color > .swatch-attribute-options")
          .length > 0
      ) {
        cy.get(".swatch-attribute.color > .swatch-attribute-options")
          .first()
          .children()
          .first()
          .click();
      }
    });

    cy.get("#qty").clear().type(3);
    cy.get('button[title="Add to Cart"]').click({ force: true });
    // cy.get(".page.messages").should("be.visible");

    cy.get(".product-info-main").then((el) => {
      const productData = {
        name: Cypress.$(el).find(".page-title").text().trim(),
        price: Cypress.$(el).find(".price").text().trim(),
        qty: Cypress.$(el).find("#qty").val(),
      };
      cy.get("@SelectedProducts").then((list) => {
        list.push(productData);
        // cy.log("product", JSON.stringify(list));

        cy.wrap(list).as("SelectedProducts");
      });
    });
    cy.go(-1);
  }

  gotoCart() {
    cy.get(".showcart").click({ force: true });
    cy.get(".viewcart").click({ force: true });
  }

  verifyItem() {
    const productList = [];
    const product = {};
    cy.get("@SelectedProducts").then((list) => {
      cy.log("SelectedProducts", JSON.stringify(list));
    });

    cy.get("table tbody tr").each(($row, index) => {
      cy.wrap($row)
        .find("td")
        .each(($cell, cellIndex) => {
          if (Cypress.$($cell).find("a").length > 0) {
            cy.wrap($cell)
              .find("a")
              .then(($link) => {
                const nameProduct = $link.text().trim();
                cy.log(` Text: ${nameProduct}`);
                product.name = nameProduct;
              });
          } else if (Cypress.$($cell).find("input").length > 0) {
            cy.wrap($cell)
              .find("input")
              .invoke("val")
              .then((val) => {
                // const nameProduct = $link.text().trim();
                cy.log(` val: ${val}`);
                product.qty = val;
              });
          } else {
            cy.wrap($cell)
              .invoke("text")
              .then((text) => {
                cy.log(`Row ${index}, Column ${cellIndex}: ${text.trim()}`);
                cellIndex === 1
                  ? (product.price = text.trim())
                  : (product.total = text.trim());
              });
          }

          // if (cellIndex == 0) {
          //   cy.wrap($cell)
          //     .find(".item > .product-item-details > .product-item-name > a")
          //     .invoke("text")
          //     .then((text) => {
          //       cy.log(`Row ${index}, Column ${cellIndex}: ${text.trim()}`);
          //     });
          // }

          // cy.wrap($cell)
          //   .invoke("text")
          //   .then((text) => {
          //     cy.log(`Row ${index}, Column ${cellIndex}: ${text.trim()}`);
          //     data = {
          //       name: cellIndex == 0 ? text.trim() : "",
          //       name: cellIndex == 0 ? text.trim() : "",
          //     };
          //   });
        });
    });
    productList.push(product);
    cy.log("productList", productList);
    cy.log("product", product);
    console.log("productList", productList);
    console.log("product", product);
  }
}
export default new Cart();
