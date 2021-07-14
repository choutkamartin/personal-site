const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "cs",
    locales: ["cs", "en"],
  },
  localePath: path.resolve("./public/static/locales"),
};
