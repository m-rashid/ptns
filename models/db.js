const config = require('config');
const firebase = require('firebase');
firebase.initializeApp(config.get('firebase'));
const database = firebase.database();

module.exports = database;