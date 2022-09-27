import download from "../download.js";
import { getItemsBySearchTerm } from "aliexpress-scraper";

const dlAliexpressImages = (keyword) => {
  console.log("here");
  return new Promise(async (resolve) => {
    let totalAli = []
    for (let g = 0; g < 3; g++) {
      const aliexpressProducts = await getAliexpress(keyword, g);
      for (let m = 0; m < aliexpressProducts.length; m++) {
        download(
          "https:" + aliexpressProducts[m].image.imgUrl,
          keyword.replaceAll(" ", "&") + (m * (g + 1)).toString() + ".jpg",
          "outputali",
          function () {
            console.log("done ali");
          }
        );
        totalAli.push(aliexpressProducts[m])

        console.log("downloading")
        if (m == aliexpressProducts.length - 1 && g == 2) {
          resolve(totalAli);
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
