const express = require('express');
const router = express.Router();
const User = require('../../models/user'); // Adjust the path as needed
const Movie = require('../../models/movie'); // Adjust the path as needed

// Route to add a like to a movie
router.post('/actions/addLike', async (req, res) => {
    try {
        // Get user ID, movie ID, movie name, movie image URL, and user name from the request body
        const { userId, movieId, movieName, movieImageUrl, userName } = req.body;

        // Update the user's document in the users database
        const userUpdateResult = await User.updateOne(
            { _id: userId },
            {
                $addToSet: {
                    likedMovies: {
                        movieId: movieId,
                        name: movieName,
                        imageUrl: movieImageUrl,
                    },
                },
            }
        );

        console.log('User update result:', userUpdateResult);

        // Update the movie's document in the movies database
        const movieUpdateResult = await Movie.updateOne(
            { _id: movieId },
            {
                $addToSet: {
                    likedBy: {
                        userId: userId,
                        name: userName,
                    },
                },
            }
        );

        console.log('Movie update result:', movieUpdateResult);

        // Check if both updates were successful
        if (userUpdateResult.modifiedCount> 0 && movieUpdateResult.modifiedCount > 0) {
            res.status(200).json({ message: 'Movie liked successfully!' });
        } else {
            res.status(400).json({ message: 'Failed to update user or movie data.' });
        }
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error('Error adding like:', error);
        res.status(500).json({ message: 'An error occurred while adding the like.', error: error.message });
    }
});
router.post('/actions/addReview', async (req, res) => {
    try {
        // Get user ID, movie ID, movie name, movie image URL, user name, and review text from the request body
        const { userId, movieId, movieName, movieImageUrl, userName, reviewText } = req.body;

        // Update the user's document in the users database
        const userUpdateResult = await User.updateOne(
            { _id: userId },
            {
                $addToSet: {
                    reviewedMovies: {
                        movieId: movieId,
                        name: movieName,
                        imageUrl: movieImageUrl,
                        review: reviewText
                    },
                },
            }
        );

        // Update the movie's document in the movies database
        const movieUpdateResult = await Movie.updateOne(
            { _id: movieId },
            {
                $addToSet: {
                    reviewedBy: {
                        userId: userId,
                        name: userName,
                        review: reviewText
                    },
                },
            }
        );

        // Check if both updates were successful
        if (userUpdateResult.modifiedCount > 0 && movieUpdateResult.modifiedCount > 0) {
            res.status(200).json({ message: 'Review added successfully!' });
        } else {
            res.status(400).json({ message: 'Failed to update user or movie data.' });
        }
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'An error occurred while adding the review.', error: error.message });
    }
});


// Export the router
module.exports = router;
