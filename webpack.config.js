const path = require("path");
const jsPath = "./src/";
const entryScriptFile = "dom-controller.js";

module.exports = {
	mode: "production",
	entry: path.resolve(__dirname, jsPath + entryScriptFile),
	output: {
		path: path.resolve(__dirname, jsPath, "webpack-bundle"),
		filename: "bundle.js",
	},
};
