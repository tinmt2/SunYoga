/* eslint-disable no-undef */
// Custom Expo webpack config to transpile problematic node_modules for web.
// Reason: some dependencies (e.g. zustand v5) use `import.meta` which can
// produce a runtime SyntaxError in the Expo web bundle. We include the
// package(s) below so babel-loader transpiles them.

const { resolve } = require("path");
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  try {
    // Find the rule that contains `oneOf` (Expo default setup)
    const oneOfRule = config.module.rules.find((r) =>
      Array.isArray(r.oneOf)
    )?.oneOf;
    if (oneOfRule) {
      oneOfRule.forEach((rule) => {
        // target babel-loader rules
        if (rule.loader && rule.loader.includes("babel-loader")) {
          // ensure include is an array we can push into
          if (!rule.include) rule.include = [];
          if (!Array.isArray(rule.include)) rule.include = [rule.include];

          // Transpile packages that ship untranspiled ESM (may reference import.meta)
          const packagesToTranspile = [
            resolve(__dirname, "node_modules", "zustand"),
          ];

          // Also accept a regex include for sub-paths inside node_modules/zustand
          const regexInclude = /node_modules[\\/]zustand/;

          packagesToTranspile.forEach((p) => {
            if (!rule.include.includes(p)) rule.include.push(p);
          });

          if (
            !rule.include.some(
              (inc) =>
                inc &&
                inc.toString &&
                inc.toString() === regexInclude.toString()
            )
          ) {
            rule.include.push(regexInclude);
          }
        }
      });
    }
  } catch (e) {
    // If something goes wrong, log a clear message but don't throw so dev server can continue.
    // eslint-disable-next-line no-console
    console.warn(
      "Could not patch webpack config to transpile node_modules:",
      e
    );
  }

  return config;
};
