const { SlashCommandBuilder } = require('discord.js');
const { pools } = require('../sequelize/pools.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('join-pool')
	.setDescription('Join a pool')
	.addStringOption(option =>
		option.setName('pool-name')
		.setDescription('Join the selected pool')
		.setAutocomplete(true)
		.setRequired(true)),
	async autocomplete(interaction) {
		const poolNames = (await pools.findAll({ attributes: ['name'] })).map(res => res.name);
		const focusedValue = interaction.options.getFocused();
		const filtered = poolNames.filter(choice => choice.toLowerCase().startsWith(focusedValue.toLowerCase()));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice }))
		);
	},
	async execute(interaction) {
		const poolNames = (await pools.findAll({ attributes: ['name'] })).map(res => res.name);
		const name = interaction.options.getString('pool-name');

		if (poolNames.find(result => result.toLowerCase() == name.toLowerCase())) {
			await interaction.reply('Successfully joined pool!');
		} else {
			await interaction.reply('Pool does not exist!');
		}
	},
};