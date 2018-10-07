function Product (req) {
    this.name = req.name;
    this.available_all_stores = req.available_all_stores;
    this.price = req.price;
    //this.stores = req.stores;
    this.quantity = req.quantity;
    this.id = req.id;
}

const db = require('./db');
const database = db.database;
const productsRef = database.ref('/products');

Product.getProducts = () => {
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

Product.prototype.postProduct = (product) => {
    productsRef.child(product.id).set(product, (error) => {
        if(error) {
            throw (error);
        }
        else {
            console.log("Push product successful!");
        }
    });  
}

Product.prototype.toString = () => {
    return this.name + this.available_all_stores + this.price;
}

Product.editProduct = (id, product) => {
    console.log(id);
    console.log(product);
    productsRef.child(id).set(product, (error) => {
        if(error) throw(error);
        else console.log("Product update successful!");
    }); 
}

Product.deleteProduct = (id) => {
    productsRef.child(id).remove((error) => {
        if(error) throw erorr;
        else console.log(`Delete product ${id} successful`);
    });
}

module.exports = Product;