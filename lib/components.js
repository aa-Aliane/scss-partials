const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const components = (styles_directory_path) => {
  const target_directory = path.join(styles_directory_path, "components");

  if (!fs.existsSync(target_directory)) {
    fs.mkdir(target_directory, (err) => {
      if (err) console.log(err);
    });
  }

  ["buttons", "lists"].forEach((r) => {
    fs.writeFile(path.join(target_directory, `_${r}.scss`), "", (err) => {
      if (err) console.log(err);
    });
  });

  fs.writeFile(
    path.join(target_directory, "_index.scss"),
    prettier.format("@forward 'buttons'; @forward 'lists';", {
      parser: "scss",
    }),
    (err) => {
      if (err) console.log(err);
    }
  );

  console.log(`components files created succesfully`);
};

module.exports = components;
