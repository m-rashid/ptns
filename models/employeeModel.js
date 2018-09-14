const database = require('./db');
const employeesRef = database.ref('/employees');

exports.getEmployees = () => {
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

exports.postEmployee = (employee) => {

    employeesRef.push(employee, (error) => {
        if(error) {
            throw (error);
        }
        else {
            console.log("Push employee successful!");
        }
    });  
}

exports.createEmployee = function(id, first_name, last_name, store_id) {
    employee = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        store_id: store_id
    };

    return employee;
}