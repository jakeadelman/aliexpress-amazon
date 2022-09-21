import { createRequire } from "module";
const require = createRequire(import.meta.url);
import download from "../download.js";
const amazonScraper = require("amazon-buddy");

const dlAmazonImages = (keyword) => {
  return new Promise(async (resolve) => {
    const options = {
      proxy: ["45.79.27.210:44554"],
    };

    const products = await amazonScraper.products({
      keyword: keyword,
      number: 70,
      options: options,
    });

    for (let b = 0; b < products.result.length; b++) {
      download(
        products.result[b].thumbnail,
        b.toString() + ".jpg",
        "outputamz",
        function () {
          console.log("done");
        }
      );
      if (b == products.length - 1) {
        resolve(products.result);
      }
    }
  });
};

export default dlAmazonImages;
