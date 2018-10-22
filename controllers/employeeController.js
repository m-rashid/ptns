const Employee = require('../models/employeeModel');
const authController = require('./authController');

//Controller object to hold the functions for CRUD operations
const employeeController = {};

//Add a new employee to the system.
employeeController.create = (req, res) => {
    //create employee object from request body
    const employee = new Employee(req.body); 
    //extract JWT token from request header
    const idToken = req.headers.authToken; 
    //verify current user with Firebase back-end
    authController.verifyToken(idToken)    
    .then ((user) => {
        console.log("user: ",user);
        Employee.checkIfManager(user.uid)
        .then ((manager) => {               //current user is manager
            console.log("manager: ",manager);
            Employee.postEmployee(employee) 
            .then (() => {
                res.send("Employee addedd successfully!");
            })
            .catch((err) => {
                res.send(err);
            })
        })     
        .catch((err) => {   //current user is not manager; return error to client
            res.send("Unauthorized access! Could not add employee.");
        })
    })
}

/*
//Add employee without performing the authorization (for testing purposes)
employeeController.create = (req, res) => {
    const employee = new Employee(req.body);
    console.log(employee);
    var postPromise = Employee.postEmployee(employee);
    postPromise.then((result) => {
            res.send(result);
    })
    .catch((error) => {
            res.send(error.code);
    });
}
*/

//handle request for retrieving all emplyoees from the system
employeeController.retrieve =  (req, res) => {
    //wait for promise defined in the model to return
    var employeesPromise = Employee.getEmployees();
    employeesPromise.then((employees) => {
        console.log(employees);
        res.send(employees);
    })
    .catch((error) => {
        res.send(error);
    });
}

//handle request for getting data on a specific employee
employeeController.employeeData = (req, res) => {
    //extract Id of the employee from request parameter
    var employeePromise = Employee.getEmployeeData(req.params.id);
    employeePromise.then((employee) => {
        console.log(employee);
        res.send(employee);
    })
    .catch((error) => {
        res.send(error);
    });
}

//handle request to delete a specific employee from the system
employeeController.deleteEmloyee = (req, res) => {
    //extract Id of employee from request body
    var employeeId = req.id;
    try {
        Employee.deleteEmployee(employeeId);
    }
    catch(error) {
        console.log(error);
    }  

}

module.exports = employeeController;