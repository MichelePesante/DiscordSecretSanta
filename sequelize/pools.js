const Sequelize = require('sequelize');
const { sequelize } = require('./sequelize.js');

module.exports = {
    pools: sequelize.define('pools', {
        name: {
            type: Sequelize.STRING,
            unique: true,
        },
        max_participant_number: Sequelize.INTEGER,
        max_cost: Sequelize.INTEGER,
        theme: Sequelize.STRING
    })
}