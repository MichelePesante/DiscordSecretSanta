const { SlashCommandBuilder } = require('discord.js');
const { pools } = require('../sequelize/pools.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('create-pool')
        .setDescription('Create a new pool')
        .addStringOption(option => option.setName('pool-name')
            .setDescription('Select the name of this pool')
            .setRequired(true))
        .addNumberOption(option => option.setName('max-number')
            .setDescription('Select the maximum number of participants of this pool'))
        .addNumberOption(option => option.setName('max-cost')
            .setDescription('Select the maximum cost for this pool gifts'))
        .addStringOption(option => option.setName('theme')
            .setDescription('Select the theme of this pool')),
    async execute(interaction) {
        const name = interaction.options.getString('pool-name');
        const maxNumber = interaction.options.getNumber('max-number');
        const maxCost = interaction.options.getNumber('max-cost');
        const theme = interaction.options.getString('theme');

        const currentNumber = maxNumber !== null ? `The maximum number of people that can join is ${maxNumber}` : 'Anyone can enter';
        const currentCost = maxCost !== null ? `The maximum cost for the gift is ${maxCost} euro` : 'No maximum cost for the gift has been set';
        const currentTheme = theme !== null ? `The selected theme is ${theme}` : 'No theme has been selected';

        try {
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            await pools.create({
                name: name,
                max_participant_number: maxNumber,
                max_cost: maxCost,
                theme: theme,
            });

            await interaction.reply(`A new pool has been created with the name ${name}! ${currentNumber}! ${currentCost}! ${currentTheme}!`);
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                await interaction.reply('That tag already exists.');
            }

            await interaction.reply('Something went wrong with adding a tag.');
        }
    }
}