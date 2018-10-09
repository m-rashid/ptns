function Employee (req) {
    this.id = req.id;
    this.first_name = req.first_name;
    this.last_name = req.last_name;
    this.store_id = req.store_id;
    this.email = req.email,
    this.password = req.password,
    this.role = req.role
}

const db = require('./db');
const database = db.database;
const authController = require('../controllers/authController');
const employeesRef = database.ref('/employees');

Employee.getEmployees = () => {
    let employees = [];

    return new Promise((resolve, reject) => {
        employeesRef.once('value', (snapshot) => {
        
            snapshot.forEach((child) => {
                var employee = child.val();
                employees.push(employee);
            });
            resolve(employees);
        });
    });
}

Employee.deleteEmployee = (id) => {
    database.ref(`/storeEmployees/${id}`).once('value', (snapshot) => {
        var store = snapshot.val();
        database.ref(`employees/${store}/${id}`).remove(error => {
            if(error) console.log(error)
            else{
                console.log(`Successfully deleted employee ${id}`);
            }
        });
    });
}

function getUserfromToken(idToken) {
    const user = authController.verifyToken(idToken);
    return user;
}

Employee.checkIfManager = (userId) => {
    return new Promise ((resolve, reject) => {
        var managersRef = database.ref('/managers');
        managersRef.child(userId).once('value', (snapshot) => {
            if(snapshot.val() !== null) resolve(true);
            else reject(false);
        });
    });
    
}

Employee.prototype.createEmployee =  (employee, idToken) => {
    
    let errorMessage = "";
    return new Promise ((resolve, reject) => {
        var authVerifyPromise = authController.verifyToken(idToken);
        authVerifyPromise.then((user) => {
            console.log("user: ",user);
            checkIfManager(user.uid)
            .then ((manager) => {
                console.log("manager: ",manager);
                if (manager == false) {
                    reject("unauthorized access");
                }
                if (manager) {
                    Employee.postEmployee(employee);
                    Employee.createUser(employee);
                    Employee.mapEmployToStore(employee.id, employee.store_id);
                    resolve("Success!");
                }
            })
            .catch ((err) => {
                console.log(err);
                errorMessage = err;
            })
        })
        .catch((error) => {
            console.log(error);
           errorMessage += error;
        });
        
        if(errorMessage != "") reject(errorMessage);
    })
}

Employee.postEmployee = (employee) => {
    return new Promise( (resolve, reject) => {
        employeesRef.child(employee.store_id).child(employee.id).set(employee, (error) => {
            if(error) {
                reject(error);
            }
            else {
                Employee.createUser(employee);
                Employee.mapEmployToStore(employee.id, employee.store_id);
                Employee.addManagerAdmin(emloyee);
                resolve("Employee push successful!")
            }
        }); 
    });
    
}

Employee.getEmployeeData = (id) => {
    /*
    let storeId = "";
    let storePromise = new Promise((resolve, reject) => {
        //employeesRef.child(employee.id).set(employee, (error) => {
        employeesRef.child(employee.store_id).child(employee.id).set(employee, (error) => {
            if(error) {
                console.log("Error");
                reject(error);
            }
            else {
                resolve("Push employee successful!");
                Employee.createUser(employee);
                Employee.mapEmployToStore(employee.id, employee.store_id);
            }
        });  
    });

    storePromise.then((storeId) => {
        console.log(storeId);
        storeId = storeId;
    });
    */
   return new Promise((resolve, reject) => {
    database.ref(`/storeEmployees/${id}`).once('value', (snapshot) => {
            var store = snapshot.val();
            console.log(`store id: ${store}`);
            database.ref(`employees/${store}/${id}`).on('value', (dataSnapshot) => {
                var employee = dataSnapshot.val();
                resolve(employee);
            });
        });
    });
}

Employee.prototype.getStore = (id) => {
    var store = employeesRef.child(id).once('value', (snapshot) => {

    })
}

Employee.addManagerAdmin = (employee) => {
    if (employee.role === "manager" || employee.role === "admin") {
        database.ref(`/${employee.role}s`).child(empoyee.id).set(employee.store_id)
        .then (() => console.log(`${employee.role} added!`))
        .catch((error) => console.log(error));
    }
}

Employee.createUser = (employee) => {
    authController.createEmployeeUser(employee);
}

Employee.mapEmployToStore = (employeeId, storeId) => {
    return new Promise ((resolve, reject) => {
        database.ref('/storeEmployees').child(employeeId).set(storeId).
        then(() => {
            resolve("mapping succeeded!");
        })
        .catch((err) => {
            reject(err);
        })
    });
    
}

Employee.prototype.toString = () => {
    return this.id + this.first_name + this.last_name;
}

module.exports = Employee;