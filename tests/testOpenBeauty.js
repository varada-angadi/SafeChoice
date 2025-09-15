// tests/testOpenBeauty.js
import fetchBeautyProduct from "../backend/api/openBeautyFacts.js";

const testBarcode = "3337875597357"; // replace with any valid OpenBeautyFacts barcode

async function test() {
  const result = await fetchBeautyProduct(testBarcode);
  if (result) {
    console.log("OpenBeautyFacts Result:", result);
  } else {
    console.log("Product not found in OpenBeautyFacts");
  }
}

test();
