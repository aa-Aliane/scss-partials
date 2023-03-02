const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {

	version: {
		type: `boolean`,
		alias: `V`,
		desc: `Print CLI version`
	},
	help: {
		type: `boolean`,
		alias: `h`,
		desc: `Print help info`
	}
};

const commands = {
	create: { desc: `Create styles folder with sass partials` },
};

const helpText = meowHelp({
	name: `sassp`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
