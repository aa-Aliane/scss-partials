const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const base = (styles_directory_path) => {
  let base = axios.get(
    "https://gist.github.com/aa-Aliane/2bf288ffd92194882034cca785c62098/raw/72d3c4c0000ebb3afd2051e5cb73ed5224c91fc7/_base.scss"
  );
  let reset = axios.get(
    "https://gist.github.com/aa-Aliane/2bf288ffd92194882034cca785c62098/raw/72d3c4c0000ebb3afd2051e5cb73ed5224c91fc7/_reset.scss"
  );
  let root = axios.get(
    "https://gist.github.com/aa-Aliane/2bf288ffd92194882034cca785c62098/raw/72d3c4c0000ebb3afd2051e5cb73ed5224c91fc7/_root.scss"
  );

  const target_directory = path.join(styles_directory_path, "base");

  if (!fs.existsSync(target_directory)) {
    fs.mkdir(target_directory, (err) => {
      if (err) console.log(err);
    });
  }

  Promise.all([base, reset, root])
    .then((r) => {
      fs.writeFile(
        path.join(target_directory, "_base.scss"),
        r[0].data,
        (err) => {
          if (err) console.log(err);
        }
      );
      fs.writeFile(
        path.join(target_directory, "_reset.scss"),
        r[1].data,
        (err) => {
          if (err) console.log("err");
        }
      );
      fs.writeFile(
        path.join(target_directory, "_root.scss"),
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
          "@forward 'base'; @forward 'reset'; @forward 'root'",
          {
            parser: "scss",
          }
        ),
        (err) => {
          if (err) console.log(err);
        }
      );

      console.log(`base files created succesfully`);
    });
};

module.exports = base;
