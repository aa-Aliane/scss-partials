const path = require("path");
const fs = require("fs");
const prettier = require("prettier");

const add_to_partial = (target_directory, partial_name) => {
  const styles_directory_path = path.join(process.cwd(), "styles/sass");
  const target_directory_path = path.join(
    styles_directory_path,
    target_directory
  );
  if (fs.existsSync(target_directory_path)) {
    const partial_path = path.join(
      target_directory_path,
      `_${partial_name}.scss`
    );
    const index_path = path.join(target_directory_path, "_index.scss");
    fs.writeFile(partial_path, "", (err) => {
      if (err) console.log(err);
    });
    fs.appendFile(
      index_path,
      prettier.format(`@forward '${partial_name}';`, { parser: "scss" }),
      (err) => {
        if (err) console.log(err);
      }
    );
    console.log(`${partial_name} added to ${target_directory}`)
  }
  else {
    console.log(`${target_directory_path} not found`)
  }
};

module.exports = add_to_partial;
