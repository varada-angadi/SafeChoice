// tests/testOpenFood.js
import fetchFoodProduct from "../backend/api/openFoodFacts.js";

async function testOpenFood() {
  const barcode = "5000254019051"; 
  const product = await fetchFoodProduct(barcode);

  if (product) {
    console.log("OpenFoodFacts Result:", product);
  } else {
    console.log("❌ Product not found or error occurred.");
  }
}

testOpenFood();
