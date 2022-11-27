const { Events } = require('discord.js');
const { pools } = require('../sequelize/pools.js');
const { users } = require('../sequelize/users.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		pools.sync();
		users.sync();
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};