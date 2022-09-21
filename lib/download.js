import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
import instance from "./api.js";

const download = async (uri, filename, output, callback) => {
  instance
    .get(uri, { responseType: "stream" })
    .then(({ data }) => {
      data.pipe(fs.createWriteStream("./" + output + "/" + filename));
    })
    .then((res, err) => {
      if (err) {
        console.log("not success");
      }
      console.log("success");
    });
};

export default download;
