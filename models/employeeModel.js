//object model defining an Employee
function Employee (req) {
    this.id = req.id;
    this.first_name = req.first_name;
    this.last_name = req.last_name;
    this.store_id = req.store_id;
    this.email = req.email,
    this.password = req.password,
    this.role = req.role
}

//Get initialized Firebase instance
const db = require('./db');
const database = db.database;
const authController = require('../controllers/authController');
//get reference to /employees node in the database
const employeesRef = database.ref('/employees');

Employee.getEmployees = () => {
    let employees = [];

    //when Promise returns, all Employees will be sent to controller
    return new Promise((resolve, reject) => {
        employeesRef.once('value', (snapshot) => {
            //get all children of '/employees' node
            snapshot.forEach((child) => {
                var employee = child.val();
                employees.push(employee);
            });
            resolve(employees);
        });
    });
}


Employee.deleteEmployee = (id) => {
    //get storeId of employee whose id is passed as parameter
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

//check if employee whose Id is passed as parameter is a manager.
Employee.checkIfManager = (userId) => {
    return new Promise ((resolve, reject) => {
        var managersRef = database.ref('/managers');
        managersRef.child(userId).once('value', (snapshot) => {
            if(snapshot.val() !== null) resolve(true); //employee is not listed under '/managers' node
            else reject(false);
        });
    });
    
}

//This function peforms authorization in hte model.
//For this system, the authorization is performed in the controller
//see postEmployee() below and create() function in the controller
Employee.prototype.createEmployee =  (employee, idToken) => {
    //variable to concatenate all the error messages received
    let errorMessage = "";
    return new Promise ((resolve, reject) => {
        //get data of current logged-in user
        var authVerifyPromise = authController.verifyToken(idToken);
        authVerifyPromise.then((user) => {
            console.log("user: ",user);
            checkIfManager(user.uid)
            .then ((manager) => {
                console.log("manager: ",manager);
                if (!manager) {
                    reject("Unauthorized access");
                }
                else {
                    //user is manager. performed three steps:
                    //1. upload the employee to the back-end database
                    //2. create a user account for this new employee
                    //3. index the employee under the '/storeEmployees' node
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

//add new employee passed as parameter to the back-end database
Employee.postEmployee = (employee) => {
    return new Promise( (resolve, reject) => {
        employeesRef.child(employee.store_id).child(employee.id).set(employee, (error) => {
            if(error) {
                reject(error);
            }
            else {
                Employee.createUser(employee);

                //index the employee, manager and admin roles to store
                Employee.mapEmployToStore(employee.id, employee.store_id);
                Employee.addManagerAdmin(employee);
                resolve("Employee push successful!")
            }
        }); 
    });
    
}

Employee.getEmployeeData = (id) => {

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

//index the employee to store under '/storeEmployees'
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

function getUserfromToken(idToken) {
    const user = authController.verifyToken(idToken);
    return user;
}

Employee.prototype.toString = () => {
    return this.id + this.first_name + this.last_name;
}

module.exports = Employee;