import { createRequire } from "module";
const require = createRequire(import.meta.url);
const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");

// const b = Buffer.from("./outputali/0.png", "base64");
const imageContents = await fs.readFile(
  "./outputali/0.png",
  function (err, res) {
    console.log("yes");
    const im1 = tf.node.decodeImage(res, 3);
    fs.readFile("./outputamz/0.png", function (err1, res1) {
      const im2 = tf.node.decodeImage(res1);
      console.log(tf.node.image.ssim(im1, im2, 255));
    });
  }
);
// const im1 = tf.node.decodeImage(imageContents, 3);

// fs.readFile("./outputali/0.png", "utf8", function (err, data) {
//   //   console.log(res.status);
//   console.log(data);
//   const b = Buffer.from(data, "base64");
//   const im1 = tf.node.decodeImage(b);
// });
// fs.readFile("./outputamz/0.png", function (res) {
//   const im2 = tf.node.decodeImage(res);
// });
// const im2 = tf.node.decodeImage("./outputamz/0.PNG");
// console.log(tf.image.ssim(im1, im2, (max_val = 255)));
