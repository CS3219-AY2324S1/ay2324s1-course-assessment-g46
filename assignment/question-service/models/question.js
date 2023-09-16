var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id: {
        type: Number, 
        required: true, 
        unique: true
    }, 
    title: {
        type: String, 
        required: true, 
    }, 
    description: {
        type: String, 
        required: true, 
    },  
    category: {
        type: String, 
        required: true, 
    }, 
    complexity: {
        type: String, 
        required: true, 
        enum: ['Easy', 'Medium', 'Hard']
    }
})

var question = new mongoose.Model('Question', schema);

module.exports = question; 