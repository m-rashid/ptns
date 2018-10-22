const Employee = require('../models/employeeModel');
const authController = require('./authController');

const employeeController = {};

employeeController.create = (req, res) => {
    const employee = new Employee(req.body);
    const idToken = req.headers.authauth;
    authController.verifyToken(idToken)
    .then ((user) => {
        console.log("user: ",user);
        Employee.checkIfManager(user.uid)
        .then ((manager) => {
            console.log("manager: ",manager);
            Employee.postEmployee(employee)
            .then (() => {
                res.send("Employee addedd successfully!");
            })
            .catch((err) => {
                res.send(err);
            })
        })
        .catch((err) => {
            res.send("Unauthorized access! Could not add employee.");
        })
    })
}

/*
employeeController.create = (req, res) => {
    const employee = new Employee(req.body);
    const idToken = req.headers.authauth;
    console.log(employee);
    console.log("idToken",idToken);
    var postPromise = employee.createEmployee(employee, idToken);
    postPromise.then((result) => {
            res.send(result);
    })
    .catch((error) => {
            res.send(error.code);
    });
}
*/
employeeController.retrieve =  (req, res) => {
    var employeesPromise = Employee.getEmployees();
    employeesPromise.then((employees) => {
        console.log(employees);
        res.send(employees);
    })
    .catch((error) => {
        res.send(error);
    });
}

employeeController.employeeData = (req, res) => {
    var employeePromise = Employee.getEmployeeData(req.params.id);
    employeePromise.then((employee) => {
        console.log(employee);
        res.send(employee);
    })
    .catch((error) => {
        res.send(error);
    });
}

employeeController.deleteEmloyee = (req, res) => {
    var employeeId = req.id;
    try {
        Employee.deleteEmployee(id);
    }
    catch(error) {
        console.log(error);
    }  

}

module.exports = employeeController;