import download from "../download.js";
import { getItemsBySearchTerm } from "aliexpress-scraper";

const dlAliexpressImages = async (keyword) => {
  console.log("here");
  return new Promise(async (resolve) => {
    for (let g = 0; g < 3; g++) {
      const aliexpressProducts = await getAliexpress(keyword, g);
      for (let m = 0; m < aliexpressProducts.length; m++) {
        download(
          "https:" + aliexpressProducts[m].image.imgUrl,
          m * (g + 1).toString() + ".jpg",
          "outputali",
          function () {
            console.log("done ali");
          }
        );
        if (m == aliexpressProducts.length - 1 && g == 2) {
          resolve(aliexpressProducts);
        }
      }
    }
  });
};

const getAliexpress = async (keyword, page) => {
  return new Promise(async (resolve, reject) => {
    const items = await getItemsBySearchTerm({
      search: keyword,
      page: page,
      minPrice: 1,
      maxPrice: 2000,
    });
    resolve(items);
  });
};

export default dlAliexpressImages;