const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const abstract = (styles_directory_path) => {
  let colors = axios.get(
    "https://gist.githubusercontent.com/aa-Aliane/b0a9b63abeef851e3f4bc863a5a37111/raw/6faebef270428011207bd661173aa559f92c9e20/_colors.scss"
  );
  let types = axios.get(
    "https://gist.githubusercontent.com/aa-Aliane/b0a9b63abeef851e3f4bc863a5a37111/raw/6faebef270428011207bd661173aa559f92c9e20/_types.scss"
  );
  let spacing = axios.get(
    "https://gist.githubusercontent.com/aa-Aliane/b0a9b63abeef851e3f4bc863a5a37111/raw/6faebef270428011207bd661173aa559f92c9e20/_spacing.scss"
  );

  // abstracts
  const target_directory = path.join(styles_directory_path, "abstracts");

  if (!fs.existsSync(target_directory)) {
    fs.mkdir(target_directory, (err) => {
      if (err) console.log(err);
    });
  }

  Promise.all([colors, types, spacing])
    .then((r) => {
      fs.writeFile(
        path.join(target_directory, "_colors.scss"),
        r[0].data,
        (err) => {
          if (err) console.log(err);
        }
      );
      fs.writeFile(
        path.join(target_directory, "_types.scss"),
        r[1].data,
        (err) => {
          if (err) console.log("err");
        }
      );
      fs.writeFile(
        path.join(target_directory, "_spacing.scss"),
        r[2].data,
        (err) => {
          if (err) console.log("err");
        }
      );
    })
    .finally(() => {
      fs.writeFile(
        path.join(target_directory, "_index.scss"),
        prettier.format(
          "@forward 'colors'; @forward 'types'; @forward 'spacing'",
          {
            parser: "scss",
          }
        ),
        (err) => {
          if (err) console.log(err);
        }
      );

      console.log(`abstracts files created succesfully`);
    });
};

module.exports = abstract;
