import { PythonShell } from "python-shell";

// const python = spawn("python3.7", ["./python/app.py"]);

// python.stdout.on("data", (data) => {
//   console.log(`stdout: ${data}`);
// });
let options = {
  pythonPath: "python/env/bin/python3.7",
  args: ["10", "10"],
};

let pyshell = new PythonShell("python/app.py", options);

pyshell.on("message", function (message) {
  console.log(message);
});

// const { spawn } = require("node:child_process");
// const ls = spawn("ls", ["-lh", "/usr"]);

// ls.stdout.on("data", (data) => {
//   console.log(`stdout: ${data}`);
// });
