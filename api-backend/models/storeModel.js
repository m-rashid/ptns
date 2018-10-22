function Store (req) {
    this.id = req.id;
    this.name = req.name;
    this.managerEmployeeId = req.managerEmployeeId;
    //this.address = req.address;
}

const db = require('./db');
const database = db.database;
const storesRef = database.ref('/stores');
const employeesRef = database.ref('/employees');

Store.prototype.postStore = (store, address) => {

    storesRef.child(store.id).set({
        name: store.name,
        managerEmployeeId: store.managerEmployeeId
    }, (error) => {
        if (error) {
            throw error;
        }
        else {
            console.log("Push store successful!");
            storesRef.child(store.id).child("location").set(address, (error) => {
                if (error) {
                    throw error;
                }
                else {
                    console.log("Push address successful!");
                }
            });
        }
    });
}

Store.getStores = () => {
    let stores = [];

    return new Promise((resolve, reject) => {
        storesRef.once('value', (snapshot) => {
        
            snapshot.forEach((child) => {
                var store = child.val();
                stores.push(store);
            });
            resolve(stores);
        });
    });
}

Store.retrieveEmployees = (storeId) => {
    let employees = [];
    return new Promise((resolve, reject) => {
        employeesRef.child(storeId).once('value', (snapshot) => {
            snapshot.forEach((child) => {
                var employee = child.val();
                employees.push(employee);
            });
            resolve(employees);
        });
    });
}

Store.getStoreFromEmployee = (uid) => {
    let storeId = "";
    let query = employeesRef.child(storeId).orderByChild("store_id").equalTo(uid);

}

Store.updateStore = (id, store) => {
    console.log(id);
    console.log(store);
    storesRef.child(id).set(store, (error) => {
        if(error) throw(error);
        else console.log("Product update successful!");
    }); 
}

Store.prototype.toString = () => {
    return this.id + this.name + this.managerEmployeeId;
}

module.exports = Store;

/*
 storesRef.child(this.id).child("location").set({
                addressLine: this.address.addressLine,
                city_town: this.address.city_town,
                country: this.address.country,
                postalCode: this.address.postalCode,
                province: this.address.province,
                suburb: this.address.suburb
            }, (error) => {
                if (error) {
                    throw error;
                }
                else {
                    console.log("Push address successful!");
                }
            });
*/