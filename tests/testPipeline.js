// tests/testPipeline.js
import dotenv from "dotenv";
import { getProductSafetyInfo } from "../backend/utils/unifiedProductPipeline.js";

dotenv.config();

(async () => {
  const result = await getProductSafetyInfo("070970474088");
  console.log(result);
})();
