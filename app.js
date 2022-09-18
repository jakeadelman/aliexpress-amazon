import { createRequire } from "module";
const require = createRequire(import.meta.url);
const amazonScraper = require("amazon-buddy");
const fs = require("fs");
require("@tensorflow/tfjs-core"); /* or @tensorflow/tfjs-node */
require("@tensorflow/tfjs-backend-cpu");
const tf = require("@tensorflow/tfjs-node");
import * as use from "@tensorflow-models/universal-sentence-encoder";
const request = require("request");
// const similarity = require('./lib/distance')
// import similarity from "./lib/distance.js"
// import * as tf from '@tensorflow/tfjs-node'
// require('@tensorflow/tfjs');
// const use = require('@tensorflow-models/universal-sentence-encoder');
// const instance = require("./api.js");?
import instance from "./api.js";
import { getItems } from "./utils.js";
import { getItemsBySearchTerm } from "aliexpress-scraper";
// const instance = instance;
// instance.interceptors.response.use(({ data }) => getItems(data));
(async () => {
  try {
    let keyword = "Iphone 13 Case";

    const options = {
      proxy: ["45.79.27.210:44554"],
    };
    const model = await use.load();
    const products = await amazonScraper.products({
      keyword: keyword,
      number: 10,
      options: options,
    });
    // console.log(products);

    for (let b = 0; b < products.result.length; b++) {
      download(
        products.result[b].thumbnail,
        b.toString() + ".jpg",
        "outputamz",
        function () {
          console.log("done");
        }
      );
    }

    for (let g = 0; g < 10; g++) {
      const aliexpressProducts = await getAliexpress(keyword, g);
      //   console.log(aliexpressProducts);
      for (let m = 0; m < aliexpressProducts.length; m++) {
        // console.log(aliexpressProducts[0].image.imgUrl);
        console.log("url is " + "https:" + aliexpressProducts[m].image.imgUrl);
        download(
          "https:" + aliexpressProducts[m].image.imgUrl,
          m.toString() + ".jpg",
          "outputali",
          function () {
            console.log("done ali");
          }
        );
      }
      // let result = products.result;

      // result.forEach(async (each) => {
      //   for (let i = 0; i < aliexpressProducts.length; i++) {
      //     const embeddings = (
      //       await model.embed([
      //         each.title,
      //         aliexpressProducts[i].title.displayTitle,
      //       ])
      //     ).unstack();
      //     const emb = tf.losses.cosineDistance(embeddings[0], embeddings[1], 0); // 0.39812755584716797
      //     const tens = emb.dataSync()[0];
      //     if (tens > 0.53) {
      //       console.log(
      //         tens,
      //         aliexpressProducts[i].title.displayTitle + "||||" + each.title
      //       );
      //     }
      //   }
      // });
    }
  } catch (error) {
    console.log(error);
  }
})();

var download = async function (uri, filename, output, callback) {
  instance
    .get(uri, { responseType: "stream" })
    .then(({ data }) => {
      data.pipe(fs.createWriteStream("./" + output + "/" + filename));
    })
    .then((res, err) => {
      console.log("success" + uri);
      if (err) {
        console.log("not success");
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
