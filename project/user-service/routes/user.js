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
router.get('/profile', userController.getProfile); 

// Get question attempts  
router.get('/attempts', userController.getQuestionAttempts); 

// Insert question attempt
router.post('/attempts', userController.insertAttempt); 

// Update profile 
router.put('/profile', userController.updateProfile); 

// Delete account
router.delete('/profile', userController.deleteAccount);

module.exports = router; 