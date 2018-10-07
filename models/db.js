/*
const config = require('config');
const firebase = require('firebase');
firebase.initializeApp(config.get('firebase'));
const database = firebase.database();
const auth = firebase.auth();
*/


const admin = require('firebase-admin');
const serviceAccount = require('../ptnsServiceAccountKey.json.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ptns-b74f2.firebaseio.com"
});

const database = admin.database();
const auth = admin.auth();


module.exports = {database, auth};