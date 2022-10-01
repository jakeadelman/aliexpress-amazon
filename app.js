import dlAliexpressImages from "./lib/dl/dlAliexpressImages.js";
import dlAmazonImages from "./lib/dl/dlAmazonImages.js";
import Images from "./models/models.js";
import { PythonShell } from "python-shell";

(async () => {
  try {
    let keyword = "Iphone 13 Case";
    Promise.allSettled([
      dlAliexpressImages(keyword),
      dlAmazonImages(keyword),
    ]).then((result) => {
      console.log(result);
      let ali = {};
      ali.result = result[0].value;
      let amz = {};
      amz.result = result[1].value;
      // console.log(amz);

      console.log("HERE");

      let options = {
        pythonPath: "/home/manx/miniconda3/envs/aliamz2/bin/python3.9",
        args: [
          "hello",
          "hello",
          // savedArr[0].toString(),
          // savedArr[savedArr.length - 1].toString(),
          result[0].value.length.toString(),
          result[1].value.length.toString(),
          keyword.replaceAll(" ", "&"),
        ],
      };

      let pyshell = new PythonShell("python/app.py", options);
      pyshell.send(JSON.stringify(ali), { mode: "json" });
      pyshell.send(JSON.stringify(amz), { mode: "json" });
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
    });
  } catch (error) {
    console.log(error);
  }
})();
