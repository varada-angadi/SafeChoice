// tests/testAnalyzeWithAI.js
import { analyzeIngredients } from "../src/utils/analyseRisk.js";

(async () => {
  const productData = {
    productName: 'Nivea Sensitive & Radiant Moisture Body Lotion, Fragrance Free',
  ingredients: [
    'WATER',
    'GLYCERIN',
    'CETEARYL ALCOHOL',
    'C15-19 ALKANE',
    'GLYCERYL STEARATE SE',
    'ISOPROPYL PALMITATE',
    'GLYCERYL STEARATE',
    'PETROLATUM',
    'PANTHENOL',
    'HELIANTHUS ANNUUS (SUNFLOWER) SEED OIL',
    'PRUNUS AMYGDALUS DULCIS (SWEET ALMOND) OIL',
    'GLYCINE SOJA (SOYBEAN) OIL',
    'HYDROLYZED PEARL',
    'TOCOPHERYL ACETATE',
    'HYDROGENATED COCO-GLYCERIDES',
    'SODIUM CETEARYL SULFATE',
    'PHENOXYETHANOL',
    'ETHYLHEXYLGLYCERIN',
    'PANTOLACTONE',
    'CARBOMER',
    'SODIUM HYDROXIDE',
    'CITRIC ACID',
    'SODIUM CITRATE.'
  ],
  };

  const result = await analyzeIngredients(productData);
  console.log(JSON.stringify(result, null, 2));
})();
