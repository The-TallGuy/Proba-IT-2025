const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
            /* Also need to implement a check that they have:
                - An '@'
                - A credible domain (find a list somewhere online for big email providers' handles) (maybe give custom looks to those with specific institutional emails)
                - A '.com' or '.ro' at the end (might be implemented via the domains at step 2 anyway, but doesn't hurt to check)
            */
        },

        password: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true,
            unique: true
            // Could give out special cosmetics to those with funny names, in all lowercase (Important Lsac members or faculty staff)
        },

        // Optional

        fullName: {
            type: String
        },

        dateOfRegistration: {
            type: Date,
            default: Date.now
        } //,

        // Bonus

        /*
        // Currency for the site. Everybody gets one for each member that signs up after them, and they can give one to a user they appreciate, every [time interval I could not come up with yet]

        miciAvailable: {
            type: Number,
            default: 5
        },

        Also: miciGiven; a way to track who you gave mici to. (Bad idea to write a DB Schema after a train ride)
        */
    }
);

module.exports = mongoose.model('User', userSchema);