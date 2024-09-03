const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Add the likedMovies array to track movies the user has liked
    likedMovies: [
     
        {
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie', // Reference to the Movie model
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,

            },
            _id:false
      
        },
        
    ],
    reviewedMovies: [
        {
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
            review: {
                type: String,
                required: true,
            },
            _id: false
        }
    ],
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
