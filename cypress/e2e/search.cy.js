import Search from "../pages/search.page";
import testdata from "../fixtures/search.json";

describe("Search function", () => {
  beforeEach(() => {
    Search.visit();
  });

  it("When search with name product should display product", () => {
    Search.enterSearchInput(testdata.productname);
    Search.searchValidCase(testdata.productname);
  });

  it("When search with categories should display list peoduct", () => {
    Search.enterSearchInput(testdata.categories);
    Search.searchValidCase(testdata.categories);
  });

  it("When search with no result cases should display warnning message", () => {
    Search.enterSearchInput(testdata.noresultcases);
    Search.searchNoResultCases("Your search returned no results.");
  });

  it("When search and sort by name", () => {
    Search.enterSearchInput(testdata.categories);
    Search.selectSortBy("name");
    Search.verifySortByName();
  });

  it("When search and sort by price", () => {
    Search.enterSearchInput(testdata.categories);
    Search.selectSortBy("price");
    Search.verifySortByPrice();
  });
});
