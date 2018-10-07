function initialize() {
  const config = require('config');
  const firebase = require('firebase');

  firebase_config = config.firebase;
  firebase.initializeApp(config.get('firebase'));
  const database = firebase.database();
  const express = require('express');
  const app = express();

  app.use(express.json());
}

module.exports = initialize;