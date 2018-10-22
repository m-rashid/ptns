const express = require('express');
const router = express.Router();

const storeController = require('./controllers/storeController');
const productController = require('./controllers/productController');
const employeeController = require('./controllers/employeeController');
const authController = require('./controllers/authController');

router.post('/stores', storeController.create);
router.get('/stores', storeController.retrieve);
router.put('/stores/:id', storeController.update)
router.get('/stores/locations', storeController.retrieveLocations);
router.get('/stores/:id/employees', storeController.retrieveEmployees);

router.post('/products', productController.create);
router.get('/products', productController.retrieve);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

router.post('/employees', employeeController.create);
router.get('/employees', employeeController.retrieve);
router.get('/employees/:id', employeeController.employeeData);

router.post('/auth/signup', authController.create);
router.get('/auth/currentuser', authController.currentUser);
//router.get('/auth/signout', authController.signOut);
module.exports = router;