const productModel = require('../models/productModel');

const productController = {};

productController.create = (req, res) => {
    const {name, available_all_locations, price, locations} = req.body;
    const product = productModel.createProduct(name, available_all_locations, price, locations);
    console.log(product);
    try {
        productModel.postProduct(product);
        res.send("Success!");
    }
    catch(error) {
        res.send(error);
    }
}

productController.retrieve =  (req, res) => {
    var productsPromise = productModel.getProducts();
    productsPromise.then((products) => {
        console.log(products);
        res.send(products);
    });
}

module.exports = productController;