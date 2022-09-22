import dlAliexpressImages from "./lib/dl/dlAliexpressImages.js";
import dlAmazonImages from "./lib/dl/dlAmazonImages.js";
import Images from "./models/models.js";

(async () => {
  try {
    let keyword = "Iphone 13 Case";
    const [ali, amz] = await Promise.all([
      dlAliexpressImages(keyword),
      dlAmazonImages(keyword),
    ]);

    // console.log(ali);
    for (let i = 0; i < amz.length; i++) {
      for (let b = 0; b < ali.length; b++) {
        const aliImg = "https:" + ali[b].image.imgUrl;
        const imgs = Images.build({
          ali_img_link: aliImg,
          amz_img_link: amz[i].thumbnail,
        });
        await imgs.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
})();
