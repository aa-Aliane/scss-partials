const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const pages = (styles_directory_path) => {
  const target_directory = path.join(styles_directory_path, "pages");

  if (!fs.existsSync(target_directory)) {
    fs.mkdir(target_directory, (err) => {
      if (err) console.log(err);
    });
  }

  [].forEach((r) => {
    fs.writeFile(path.join(target_directory, `_${r}.scss`), "", (err) => {
      if (err) console.log(err);
    });
  });

  fs.writeFile(
    path.join(target_directory, "_index.scss"),
    prettier.format("", {
      parser: "scss",
    }),
    (err) => {
      if (err) console.log(err);
    }
  );

  console.log(`pages folder created succesfully`);
};

module.exports = pages;
