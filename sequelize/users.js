const Sequelize = require('sequelize');
const { sequelize } = require('./sequelize.js');

module.exports = { 
    users: sequelize.define('users', {
        tag: {
            type: Sequelize.STRING,
            unique: true,
        },
        pool_name: Sequelize.STRING
    })
}