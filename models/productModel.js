const database = require('./db');
const productsRef = database.ref('/products');

exports.getProducts = () => {
    let products = [];

    return new Promise((resolve, reject) => {
        productsRef.once('value', (snapshot) => {
        
            snapshot.forEach((child) => {
                var product = child.val();
                products.push(product);
            });
            resolve(products);
        });
    });
}

exports.postProduct = (product) => {

    productsRef.push(product, (error) => {
        if(error) {
            throw (error);
        }
        else {
            console.log("Push product successful!");
        }
    });  
}

exports.createProduct = function(name, available_all_locations, price, locations) {
    product = {
        name: name,
        available_all_locations: available_all_locations,
        price: price,
        locations: locations
    };

    return product;
}