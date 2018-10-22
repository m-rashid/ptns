const firebase = require('firebase');

const devConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};



firebase.initializeApp(devConfig);


const auth = firebase.auth();

export {
  auth, firebase
};