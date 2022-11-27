const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pick')
		.setDescription('Pick your friend!'),
	async execute(interaction) {
		await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
	},
};