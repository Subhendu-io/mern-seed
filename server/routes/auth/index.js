const express = require('express');
const router = express.Router();

// importing controllers
const authController = require('./../../controllers/auth.controller');

// importing validators
const authValidator = require('./../../validators/auth.validator');

// auth routes
router.post('/login', authValidator.login, authController.login);
router.post('/logout', authValidator.logout, authController.logout);
router.post('/register', authValidator.register, authController.register);
router.post('/verification/send-email', authValidator.sendVerificationEmail, authController.sendVerificationEmail);
router.post('/verification/verify-email', authValidator.verifyEmail, authController.verifyEmail);

module.exports = router;