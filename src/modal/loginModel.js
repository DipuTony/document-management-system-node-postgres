var mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        // unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;