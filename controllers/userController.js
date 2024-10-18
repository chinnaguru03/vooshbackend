const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const passport = require('passport');

// Register a new user
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            firstName,
            lastName,
            email,
            password: await bcrypt.hash(password, 10) // Hash the password
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, // Add your JWT secret to the .env file
            { expiresIn: '1h' } // Token expiration time
        );

        res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email,password:user.password } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Google Authentication
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Callback route for Google to redirect to
const googleAuthCallback = async (req, res) => {
    const token = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.redirect(`http://localhost:3000?token=${token}`); // Redirect to your frontend with the token
};

const logout = (req, res) => {
    // Since JWT is stateless, we will just send a success response
    // In a more secure implementation, you might want to invalidate the token.
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    register,
    login,
    googleAuth,
    googleAuthCallback,
    logout
};