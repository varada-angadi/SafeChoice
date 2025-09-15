// src/api/ewgScraper.js
import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Scrape product details from a given EWG product URL
 * @param {string} url
 * @returns {Promise<{productName: string, ingredients: string[], source: string}>}
 */
async function scrapeProduct(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    // --- Product Name ---
    const productName =
      $("h2.product-name").first().text().trim() ||
      $("h1").first().text().trim();

    // --- Ingredients ---
    const ingredientSection = $("#label-information");
    let ingredients = [];
    if (ingredientSection.length) {
      const ingText = ingredientSection.find("p").text().trim();
      ingredients = ingText.split(",").map((i) => i.trim());
    }

    return {
      productName,
      ingredients,
      source: "ewg",
    };
  } catch (err) {
    console.error("Error scraping product:", err.message);
    return {
      productName: "",
      ingredients: [],
      source: "ewg",
    };
  }
}

/**
 * Search EWG by product name and scrape the first result
 * @param {string} query - Product name to search
 * @returns {Promise<{productName: string, ingredients: string[], source: string} | null>}
 */
export async function searchEwgProduct(query) {
  try {
    const searchURL = `https://www.ewg.org/skindeep/search/?search=${encodeURIComponent(
      query
    )}`;
    const { data } = await axios.get(searchURL, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);

    // Grab first product link
    const firstLink = $(".product-tile a").first().attr("href");
    if (!firstLink) {
      console.log("❌ No product found for:", query);
      return null;
    }

    // Ensure full URL
    const productURL = firstLink.startsWith("http")
      ? firstLink
      : `https://www.ewg.org${firstLink}`;

    console.log("➡️ Found product URL:", productURL);

    // Scrape product details
    return await scrapeProduct(productURL);
  } catch (err) {
    console.error("Error searching EWG:", err.message);
    return null;
  }
}

export default searchEwgProduct;
