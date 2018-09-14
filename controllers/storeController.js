const Store = require('../models/storeModel');
const Location = require('../models/locationModel');
const storeController = {};

storeController.create = (req, res) => {
    const store = new Store (req.body);
    const location = new Location (req.body.address);
    console.log(store);
    try {
        store.postStore(store, location);
        res.send("Success!");
    }
    catch(error) {
        res.send(error);
    }
}

storeController.retrieve = (req, res) => {
    var storesPromise = Store.getStores();
    storesPromise.then((stores) => {
        console.log(stores);
        res.send(stores);
    });
}

storeController.retrieveLocations = (req, res) => {
    var locationPromise = Location.getLocations();
    locationPromise.then((locations) => {
        console.log(locations);
        res.send(locations);
    });
}

module.exports = storeController;