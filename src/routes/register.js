const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

const saltRounds = 10; // Number of salt rounds for hashing
const secretKey = 'mysecretkey';
const { registerUser } = require('../modal/loginModel');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required()
});


router.post('/', async (req, res) => {

    const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(item => item.message);  //Collection Errors
        return res.status(400).json({ error: errorMessages });
    }


    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    // return console.log(hashedPassword)

    let body = {
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        phone: req.body.phone
    };


    try {
        const registeredUser = await registerUser(body);
        if (registeredUser) {
            res.status(201).json({ status: true, message: "User Register Successfully", data: registeredUser });
        } else {
            res.status(201).json({ status: false, message: "Failed to Register user", data: registeredUser });
        }
    } catch (err) {
        res.status(500).send({ status: false, message: "Error while registration", data: err });
    }
});

module.exports = router;
