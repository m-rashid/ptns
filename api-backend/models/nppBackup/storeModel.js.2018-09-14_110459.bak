const database = require('./db');
const storesRef = database.ref('/stores');

exports.createStore = function(name, managerEmployeeId) {
    store = {
        name: name,
        managerEmployeeId: managerEmployeeId,
    };

    return store;
}

exports.createAddress = function(address_line, suburb, province, city_town, postal_code, country) {
    address = {
        address_line: address_line,
        suburb: suburb,
        province: province,
        city_town: city_town,
        postal_code: postal_code,
        country: country
    };

    return address;
}

exports.getStores = () => {
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

exports.getLocations = () => {
    let locations = [];

    storesRef.once('value', (snapshot) => {
        snapshot.forEach((child) => {
            var store = child.val();
            location.push(store.address);
        }, (error) => {
            if(error) {
                throw error;
            }
            else {
                console.log("Fetch locations successful!");
            }
        });

        return locations;
    });

}

exports.postStore = (id, store, address) => {

    storesRef.child(id).set(store, (error) => {
        if (error) {
            throw error;
        }
        else {
            console.log("Push store successful!");

            storesRef.child(id).child("location").set(address, (error) => {
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