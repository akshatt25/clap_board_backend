const express = require('express');
const Movie = require('../models/movie');

const router = express.Router();

// Route to fetch movies data
router.get('/getMovies', async (req, res) => {
    try {
        // Get page and limit from query parameters for pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetch movies from the database with pagination
        const movies = await Movie.find()
                                  .skip(skip)
                                  .limit(limit);

        // If movies are found, return them as a JSON response
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/getMovieDetails/:movieId', async (req, res) => {
    try {
        const { movieId } = req.params;

        // Find the movie by its ID
        const movie = await Movie.findById(movieId);

        // Check if the movie exists
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // If the movie exists, return its details
        res.status(200).json(movie);
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching movie details:', error);
        res.status(500).json({ message: 'An error occurred while fetching movie details', error: error.message });
    }
});


router.get('/getMoviesByCat/:cat', async (req, res) => {
    try {

        const category = req.params.cat;
        // Get page and limit from query parameters
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 20; // Default to 20 movies per page
        
        // Calculate the offset
        const skip = (page - 1) * limit;

        // Query the database for movies with the genre "Comedy" in their genres array
        // Apply pagination using skip and limit
        const [comedyMovies, totalCount] = await Promise.all([
            Movie.find({ genres: category })
                .skip(skip)
                .limit(limit),
            Movie.countDocuments({ genres: category })
        ]);

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalCount / limit);

        // Send the response with the list of comedy movies and pagination information
        res.json({
            data: comedyMovies,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCount: totalCount
            }
        });
    } catch (error) {
        // Handle any errors that occur during the database query
        res.status(500).json({ message: 'An error occurred while fetching movies with genre Comedy', error: error.message });
    }
});

router.get('/getMoviesByMultiCat/:cat', async (req, res) => {
    try {
        // Get the category parameter, which may contain multiple categories separated by commas
        const categoryParam = req.params.cat;
        const categories = categoryParam.split(','); // Split the categories into an array

        // Get page and limit from query parameters
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 20; // Default to 20 movies per page
        
        // Calculate the offset
        const skip = (page - 1) * limit;

        // Initialize an array to store the movies
        let allMovies = [];

        // Start with movies that match all specified genres
        for (let i = categories.length; i > 0; i--) {
            // Generate combinations of the genres of length `i`
            const genreCombinations = combinations(categories, i);

            // For each combination, find movies that match the genres, are released after 1995, and sort by IMDb rating
            for (const combo of genreCombinations) {
                const movies = await Movie.find({ genres: { $all: combo }, year: { $gt: 1995 } })
                    .sort({ 'imdb.rating': -1 }) // Sort by IMDb rating in descending order
                    .skip(skip)
                    .limit(limit);
                
                allMovies = [...allMovies, ...movies];
                if (allMovies.length >= limit) {
                    break;
                }
            }

            if (allMovies.length >= limit) {
                break;
            }
        }

        // Slice the movies array based on the page and limit
        const paginatedMovies = allMovies.slice(0, limit); // All movies will already be limited by the query

        // Calculate the total number of pages
        const totalPages = Math.ceil(allMovies.length / limit);

        // Send the response with the list of movies and pagination information
        res.json({
            data: paginatedMovies,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCount: allMovies.length
            }
        });
    } catch (error) {
        // Handle any errors that occur during the database query
        res.status(500).json({ message: 'An error occurred while fetching movies with specified genres', error: error.message });
    }
});

// Helper function to generate combinations of the genres
function combinations(arr, len) {
    const results = [];
    function helper(start, combo) {
        if (combo.length === len) {
            results.push(combo);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            helper(i + 1, [...combo, arr[i]]);
        }
    }
    helper(0, []);
    return results;
}





module.exports = router;
