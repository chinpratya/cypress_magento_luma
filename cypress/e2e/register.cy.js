import Register from "../pages/register.page";
import testdata from "../fixtures/register.json";

describe("Register Fucntion", () => {
  beforeEach(() => {
    Register.visit();
  });

  it("verify register fuction with short password", () => {});
});
