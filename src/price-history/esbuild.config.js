// esbuild.config.js
const config = () => {
  return {
    bundle: true,
    minify: true,
    platform: "node",
    target: "node20",
    tsconfig: "./tsconfig.json",
    external: ["aws-sdk"],
    format: "cjs",
  };
};
module.exports = config;
