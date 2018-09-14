const storeModel = require('../models/storeModel')

const storeController = {};

storeController.create = (req, res) => {
    const {id, name, managerEmployeeId, address} = req.body;
    const store = storeModel.createStore(name, managerEmployeeId);
    console.log(store);
    try {
        storeModel.postStore(id, store, address);
        res.send("Success!");
    }
    catch(error) {
        res.send(error);
    }
}

storeController.retrieve = (req, res) => {
    var storesPromise = storeModel.getStores();
    storesPromise.then((stores) => {
        console.log(stores);
        res.send(stores);
    });
}

module.exports = storeController;