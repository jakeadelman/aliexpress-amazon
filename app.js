import dlAliexpressImages from "./lib/dl/dlAliexpressImages.js";
import dlAmazonImages from "./lib/dl/dlAmazonImages.js";
import Images from "./models/models.js";
import { PythonShell } from "python-shell";

(async () => {
  try {
    let keyword = "Iphone 13 Case";
    const [ali, amz] = await Promise.all([
      dlAliexpressImages(keyword),
      dlAmazonImages(keyword),
    ]);
    let savedArr = [];
    // console.log(ali);
    // console.log(ali);
    let totalAli = 0;
    for (let i = 0; i < amz.length; i++) {
      for (let b = 0; b < ali.length; b++) {
        const aliImg = "https:" + ali[b].image.imgUrl;
        const imgs = Images.build({
          ali_img_link: aliImg,
          amz_img_link: amz[i].thumbnail,
        });
        totalAli += ali.length;
        let saved = await imgs.save();
        savedArr.push(saved.dataValues.id);
        if (i == amz.length - 1 && b == ali.length - 1) {
          let options = {
            pythonPath: "python/env/bin/python3.7",
            args: [
              savedArr[0].toString(),
              savedArr[savedArr.length - 1].toString(),
              amz.length.toString(),
              totalAli.toString(),
              keyword.replaceAll(" ", "&"),
            ],
          };

          let pyshell = new PythonShell("python/app.py", options);
          pyshell.on("stderr", function (stderr) {
            // handle stderr (a line of text from stderr)
            console.log(stderr);
          });
          pyshell.on("pythonError", function (err) {
            console.log(err);
          });
          pyshell.on("message", function (message) {
            console.log(message);
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
})();
