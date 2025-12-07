const mongoose = require('mongoose');

const grillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        menu: {
            type: String,
            enum: ['Meat Lovers', 'Vegetarian', 'Vegan'],
            default: 'Meat Lovers'
        },

        description: {
            type: String,
            default: ""
        },

        photoUrl: {
            type: String,   // Local link (no abs. paths)
            default: "../imgs/default.jpeg"     // Add link to the default grill photo here
        },
        
        mici: {
            type: Number,
            default: 0 
        },
        
        likedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);

module.exports = mongoose.model('Grill', grillSchema);