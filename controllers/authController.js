const db = require('../models/db');
const auth = db.auth;

const authController = {};

/* authController.signIn = (req, res) => {
    auth.createUser({email: req.body.email, password: req.body.password})
    .then( (user) => {
        res.send(user.user.uid);
        console.log(user.user.uid);
    })
    .catch( (error) => {
        // Handle Errors here.
        res.send(error.message);
        console.log(error.message)   
    });
} */

authController.create = (req,res) => {
    try{
    auth.createUser(req.body)
    .then(function(userRecord) {
        console.log("Successfully created new user:", userRecord.uid);
        res.send("Success");
      })
      .catch(function(error) {
        console.log("Error creating new user:", error);
        res.send(error);
      });
    }
    catch(err) {
        console.log(err);
    }   
}

authController.currentUser = (req, res) => {
    var user = auth.currentUser;
    if (user) {
        res.send(user);
    }
    else{
        res.send("No logged in user");
    }
}

authController.createEmployeeUser = (employee) => {
    try{
    auth.createUser({
        "uid": employee.id,
        "email": employee.email,
        "password": employee.password,
        "phoneNumber": employee.phone_number,
        "displayName": employee.first_name + employee.last_name
    })
    .then(function(userRecord) {
        console.log("Successfully created new user:", userRecord.uid);
      })
      .catch(function(error) {
        console.log("Error creating new user:", error);
      });
    }
    catch(err) {
        console.log(err);
    }   
}

authController.currentUser = (req, res) => {
    var user = auth.currentUser;
    if (user) {
        res.send(user);
    }
    else{
        res.send("No logged in user");
    }
}


authController.signOut = (req, res) => {
    auth.signOut()
    .then( (user) => {
        res.send("Signed out!");

    })
    .catch( (error) => {
        // Handle Errors here.
        res.send(error.message.code);   
    });
}

authController.verifyToken = (idToken) => {
    return new Promise((resolve, reject) => {
        auth.verifyIdToken(idToken)
        .then((decodedToken) => {
            resolve(decodedToken);
        }).catch((error) => {
            reject(error);
        }); 
    });
}


module.exports = authController;