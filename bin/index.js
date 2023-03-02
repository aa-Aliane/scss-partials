#!/usr/bin/env node

/**
 * sassp
 * Create basics sass partials structure folder
 *
 * @author aa-Aliane
 */

const init = require("../utils/init");
const cli = require("../utils/cli");
const log = require("../utils/log");

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const abstract = require("../lib/abstract");
const base = require("../lib/base");
const components = require("../lib/components");
const layouts = require("../lib/layouts");
const pages = require("../lib/pages");

(async () => {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);

  debug && log(flags);

  if (input.includes("create")) {
    // styles directory
    const styles_directory_path = path.join(process.cwd(), "styles");
    if (!fs.existsSync(styles_directory_path)) {
      fs.mkdir(styles_directory_path, (err) => {
        if (err) console.log(err);
      });
    }
    //  sass directory
    const sass_directory_path = path.join(styles_directory_path, "sass");
    if (!fs.existsSync(sass_directory_path)) {
      fs.mkdir(sass_directory_path, (err) => {
        if (err) console.log(err);
      });
    }

    abstract(sass_directory_path);
    base(sass_directory_path);
    components(sass_directory_path);
    layouts(sass_directory_path);
    pages(sass_directory_path);

    //   write style.scss
    fs.writeFile(
      path.join(sass_directory_path, "style.scss"),
      prettier.format("@use 'base';@use 'pages';@use 'components';", {
        parser: "scss",
      }),
      (err) => {
        if (err) console.log(err);
      }
    );

    //   write style.css
    fs.writeFile(path.join(styles_directory_path, "style.css"), "", (err) => {
      if (err) console.log(err);
    });
  }
})();