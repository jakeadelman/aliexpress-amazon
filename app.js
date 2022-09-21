import dlAliexpressImages from "./lib/dl/dlAliexpressImages.js";
import dlAmazonImages from "./lib/dl/dlAmazonImages.js";

(async () => {
  try {
    let keyword = "Iphone 13 Case";
    const [ali, amz] = await Promise.all([
      dlAliexpressImages(keyword),
      dlAmazonImages(keyword),
    ]);
    console.log(amz);
    console.log(ali);
  } catch (error) {
    console.log(error);
  }
})();
