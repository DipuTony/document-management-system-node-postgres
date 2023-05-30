const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const secretKey = 'mysecretkey';

const { loginUser } = require('../modal/loginModel');

router.post('/', async (req, res) => {

    // Find the user in the MongoDB collection

    const loggedInUser = await loginUser(req.body);


    // if (err) {
    //     return res.status(500).json({ status: false, message: 'Error finding user' });
    // }
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