const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

const secretKey = 'mysecretkey';

const { loginUser } = require('../modal/loginModel');

// Validation schema for the login request body
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Route to handle the login request
router.post('/', async (req, res) => {
    // Validate the login request body
    const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        // If validation fails, return the error messages
        const errorMessages = error.details.map(item => item.message);  // Collection of errors
        return res.status(400).json({ error: errorMessages });
    }

    // Called modal function sending email to the modal
    const loggedInUser = await loginUser(req.body.email);
    if (!loggedInUser) {
        // If user is not found, return an error message
        return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(req.body.password, loggedInUser.password);

    if (isMatch) {
        // If the password matches, generate a JSON Web Token
        const token = jwt.sign({
            userId: loggedInUser.id,
            userName: loggedInUser.name,
            userEmail: loggedInUser.email
        }, secretKey, {
            expiresIn: '1h'
        });

        // Send the token and a success message
        res.json({ status: true, message: 'Login Successful', token });

    } else {
        // If the password doesn't match, return an error message
        res.status(401).send({ message: "Incorrect email or password" });
    }
});

module.exports = router;
