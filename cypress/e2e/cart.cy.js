import Cart from "../pages/cart.page";
import testdata from "../fixtures/search.json";

describe("Search function", () => {
  beforeEach(() => {
    Cart.visit();
    cy.wrap([]).as("SelectedProducts");
  });
  it("Select an item and verify in the cart", () => {
    for (let index = 0; index < 2; index++) {
      Cart.addProducttoCart(index);
    }

    Cart.gotoCart();
    Cart.verifyItem();
  });
});
