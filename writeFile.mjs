import * as fs from "node:fs";

const content = "This is the content of my text file";
fs.writeFile("text.txt", content, (error) => {
  if (error) {
    console.error(error);
  }
  console.log("File written successfully!");
});
