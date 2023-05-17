const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const secretKey = 'mysecretkey';

const User = require('../modal/loginModel')

// var mongoose = require('mongoose'); // Imported Mongo
// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     phone: String
// });

// const User = mongoose.model('users1', UserSchema);


router.post('/', async (req, res) => {

    try {

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let body = {
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            phone: req.body.phone
        }

        let user = new User(body);
        user.save()
            .then(doc => {
                let data = {
                    status: true,
                    message: "User Added Successfully"
                }
                res.json({ data })
            })
            .catch((err) => res.json({ status: false, msg: "Error while Adding Customer", data: err }))

    } catch (err) {
        res.status(500).send({ Status: false, Message: "Error while resigtration", Data: err });
    }

})


module.exports = router;