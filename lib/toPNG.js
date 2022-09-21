import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Importing the jimp module
const Jimp = require("jimp");

//We will first read the JPG image using read() method.
Jimp.read("outputamz/0.jpg", function (err, image) {
  //If there is an error in reading the image,
  //we will print the error in our terminal
  if (err) {
    console.log(err);
  }
  //Otherwise we convert the image into PNG format
  //and save it inside images folder using write() method.
  else {
    image.write("outputamz/0.png");
  }
});
