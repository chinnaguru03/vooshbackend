const express = require('express');
const { register, login,logout,googleAuthUser } = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../middlewares/validationMiddleware');
const passport = require('passport');

const router = express.Router();

router.post('/api/register', registerValidation, register);
router.post('/api/login', loginValidation, login);
router.post('/auth/google', googleAuthUser); 
router.post('/logout', logout);

module.exports = router;