const Product = require('../models/productModel');
const productController = {};

productController.create = (req, res) => {
    const product = new Product(req.body);
    try {
        product.postProduct(product);
        res.send("Success!");
    }
    catch(error) {
        res.send(error);
    }
}

productController.retrieve =  (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed       
    var productsPromise = Product.getProducts();
    productsPromise.then((products) => {
        res.send(products);
    });
}

productController.delete =  (req, res) => {
    try {
        Product.deleteProduct(req.params.id);
        res.send("Success!");
    }
    catch(error) {
        res.send(error);
    }

}

productController.update = (req, res) => {
    try {
        Product.editProduct(req.params.id, req.body);
        res.send("Success!");
    }
    catch(error) {
        res.send(error);
    }
}

module.exports = productController;