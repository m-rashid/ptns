/*
const config = require('config');
const firebase = require('firebase');
firebase.initializeApp(config.get('firebase'));
const database = firebase.database();
const auth = firebase.auth();
*/


const admin = require('firebase-admin');
const serviceAccount = require('../ptnsServiceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ""
});

const database = admin.database();
const auth = admin.auth();


module.exports = {database, auth};
