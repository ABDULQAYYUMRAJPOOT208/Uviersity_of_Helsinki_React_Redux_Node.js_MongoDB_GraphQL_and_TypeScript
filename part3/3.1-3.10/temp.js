console.log("./data.json");
const fs = require("fs");
const data = fs.readFileSync("./data.json", "utf8");
console.log(data);
