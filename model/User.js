const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        require : true,
        minLength:6,
        maxlength : 255,
    },
    email: {
        type : String,
        require : true,
        minLength:6,
        maxlength : 255,
    },
    password: {
        type : String,
        require : true,
        minLength:6,
        maxlength : 1024,
    },
    date: {
        type : String,
        default : Date.now(),
    }
});

module.exports = mongoose.model('User', userSchema);
