const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

const secretKey = 'mysecretkey';

const { loginUser } = require('../modal/loginModel');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

router.post('/', async (req, res) => {
    const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(item => item.message);  //Collection Errors
        return res.status(400).json({ error: errorMessages });
    }

    const loggedInUser = await loginUser(req.body);
    if (!loggedInUser) {
        return res.status(404).json({ status: false, message: 'User not found' });
    }
    // Compare the password
    const isMatch = await bcrypt.compare(req.body.password, loggedInUser.password);

    if (isMatch) {
        const token = jwt.sign({
            userId: loggedInUser.id,
            userName: loggedInUser.name,
            userEmail: loggedInUser.email
        }, secretKey, {
            expiresIn: '1h'
        });

        res.json({ status: true, message: 'Login Successful', token });

    } else {
        res.status(401).send({ message: "Incorrect email or password" });
    }

});



module.exports = router;