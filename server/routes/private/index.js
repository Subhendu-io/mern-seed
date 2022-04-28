const express = require('express');
const router = express.Router();

// Importing Authentication Guard
const authGuard = require('./../../guard/auth.guard');

// Importing Controllers
const roleController = require('./../../controllers/role.controller');
const userController = require('./../../controllers/user.controller');

// Importing Validators
const roleValidator = require('./../../validators/role.validator');
const userValidator = require('./../../validators/user.validator');

// Role Routes
router.get('/roles', authGuard.authenticate('ADMIN'), roleController.getRoles);
router.post('/roles', authGuard.authenticate('ADMIN'), roleValidator.createRole, roleController.createRole);

// User Routes
router.get('/users', authGuard.authenticate('ADMIN'), userController.getUsers);
router.post('/user/roles', authGuard.authenticate('ADMIN'), userValidator.addUserRole, userController.addUserRole);

module.exports = router;