const express = require('express');
const {
    getAllUsers,
    createUser,
    login
} = require('../Controller/UserController'); // Import the controller functions

const router = express.Router();

// Define routes and link them to the controller functions
router.get('/', getAllUsers);       // Get all users
router.post('/register', createUser); // Register a new user
router.post('/login', login);         // Login a user

module.exports = router;
