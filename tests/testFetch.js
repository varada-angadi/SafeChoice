// tests/testFetchProduct.js
import { fetchProductIngredients } from "../src/fetch/fetchProductIngrediants.js";

(async () => {
  const result = await fetchProductIngredients({
    barcode: "",
    productName: "Nivea Men's Dark Spot Reduction Face Wash",
  });

  console.log("Unified Product Result:", result);
})();
