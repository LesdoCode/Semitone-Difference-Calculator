const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const window = fs.readFileSync(
	path.resolve(__dirname, "../../index.html"),
	"utf-8"
);

module.exports = new JSDOM(window).window.document;
