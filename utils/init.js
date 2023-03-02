const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');

module.exports = ({ clear = true }) => {
	unhandled();
	welcome({
		title: `sassp`,
		tagLine: `by aa-Aliane`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#cd669b',
		color: '#fff',
		bold: true,
		clear
	});
};
