const express = require('express');
const { register, login, googleAuth, googleAuthCallback,logout } = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../middlewares/validationMiddleware');
const passport = require('passport');

const router = express.Router();

router.post('/api/register', registerValidation, register);
router.post('/api/login', loginValidation, login);
router.get('/auth/google', googleAuth); // Initiates Google authentication
router.get('/auth/google/callback', googleAuthCallback); // Google redirects here after authentication
router.post('/logout', logout);

module.exports = router;