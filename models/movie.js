const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    plot: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        required: true,
    },
    runtime: {
        type: Number,
        required: true,
    },
    cast: {
        type: [String],
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    fullplot: {
        type: String,
        required: true,
    },
    languages: {
        type: [String],
        required: true,
    },
    released: {
        type: Date,
        required: true,
    },
    directors: {
        type: [String],
        required: true,
    },
    rated: {
        type: String,
        required: true,
    },
    awards: {
        wins: {
            type: Number,
            required: true,
        },
        nominations: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    lastupdated: {
        type: Date,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    imdb: {
        rating: {
            type: Number,
            required: true,
        },
        votes: {
            type: Number,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
    },
    countries: {
        type: [String],
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    tomatoes: {
        viewer: {
            rating: {
                type: Number,
                required: true,
            },
            numReviews: {
                type: Number,
                required: true,
            },
            meter: {
                type: Number,
                required: true,
            },
            fresh: {
                type: Number,
                required: true,
            },
        },
        critic: {
            rating: {
                type: Number,
                required: true,
            },
            numReviews: {
                type: Number,
                required: true,
            },
            meter: {
                type: Number,
                required: true,
            },
            rotten: {
                type: Number,
                required: true,
            },
            lastUpdated: {
                type: Date,
                required: true,
            },
        },
    },
    num_mflix_comments: {
        type: Number,
        required: true,
    },
    // Add the likedBy field
    likedBy: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference to the User model
            },
            name: {
                type: String,
                required: true,
            },
            _id:false
        },
    ],
    reviewedBy: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            name: {
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
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
