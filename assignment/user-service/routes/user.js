var express = require("express"); 
var router = express.Router(); 
var userController = require('../controllers/userController'); 
var authMiddleware = require('../middlewares/auth'); 

// Sign up 
router.post('/signup', userController.signup); 

// Log in 
router.post('/login', userController.login); 

// Sign out 
router.post('/logout', userController.logout); 

// Authenticate the following part
router.use(authMiddleware.auth)

// Get profile 
router.get('/me', userController.getProfile); 

// Update profile 
router.put('/updateProfile', userController.updateProfile); 

// Delete account
router.delete('/deleteAccount', userController.deleteAccount);

module.exports = router; 