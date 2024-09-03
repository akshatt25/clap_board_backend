const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model


// Define the createUser route
router.post('/auth/createUser', async (req, res) => {
    try {
        // Extract user data from the request body
        const { firebaseUid, name, email } = req.body;

        // Create a new user document FID AND EMAIL SHOULD BE UNIQUE
        const newUser = new User({
            firebaseUid: firebaseUid,
            name: name,
            email: email,
            // Add any additional fields as needed
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Export the router
module.exports = router;
