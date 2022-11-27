const { dbuser, dbpsw } = require('../config.json');
const Sequelize = require('sequelize');

module.exports = { 
    sequelize: new Sequelize('database', dbuser, dbpsw, {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        // SQLite only
        storage: 'database.sqlite',
    })
}