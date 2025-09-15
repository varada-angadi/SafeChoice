// tests/testEwgScraper.js
import searchEwgProduct from "../src/scrapers/ewgScraper.js";

async function testEwg() {
  const productName = "Nivea Sensitive & Radiant Moisture Body Lotion";
  const product = await searchEwgProduct(productName);

  if (product) {
    console.log("EWG Scraper Result:", product);
  } else {
    console.log("❌ Product not found in EWG.");
  }
}

testEwg();
