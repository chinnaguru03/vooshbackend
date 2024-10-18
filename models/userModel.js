const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
        lowercase: true, // Converts email to lowercase
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Regex for basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Sets a minimum length for password
    }
}, {
    timestamps: true // Automatically creates createdAt and updatedAt fields
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;