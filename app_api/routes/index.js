const express = require('express'); // Express app
const router = express.Router(); // Router logic
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});


// This is where we import the controllers we will route
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// define route for our trips endpoint
router
    .route('/login')
    .post(authController.login);
router
    .route('/register')
    .post(authController.register);
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes triplist
    .post(auth.tripsController.tripsAddTrip); // POST method Adds a Trip 

// GET method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth.tripsController.tripsUpdateTrip);
    
module.exports = router;