const knex = require('knex');
const config = require('./knexfile');

// Choose the environment — here we use 'development'
const db = knex(config.development);

module.exports = db;
