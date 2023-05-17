const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const secretKey = 'mysecretkey';

const User = require('../modal/loginModel')

router.post('/', async (req, res) => {

    // Find the user in the MongoDB collection
    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Error finding user' });
        }
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        // client.close();
        if  (isMatch) {

            const token = jwt.sign({
                userId: user._id,
                userName: user.name,
                userEmail: user.email
            }, secretKey, {
                expiresIn: '1h'
            });

            // The JSON Web Token is sent to the client
            res.json({ status: true, message: 'Login Successfull', token });

        } else {
            res.status(401).send({ message: "Incorrect email or password" });
        }

    });

})


module.exports = router;