const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
let cors = require("cors");

var pool = require('./src/database'); //Imported Postgres Database


app.use(express.json()) // for parsing application/json

// Your secret key for signing the JSON Web Token
const secretKey = 'mysecretkey';


app.use(cors());

app.get('/', (req, res, next) => {
    console.log("API Call Started")
    next();
});
app.get('/', (req, res, next) => {
    res.send("This is home index")
    next();
});
app.get('/', (req, res) => {
    console.log("API Call Ended")
});

// Middleware function to verify the JSON Web Token
function authenticateToken(req, res, next) {
    // Get the JSON Web Token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ status: false, message: 'Unauthorized' }); // if there isn't any token

    // Verify the JSON Web Token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ status: false, message: 'Error : Key missmatch' });
        req.user = user;
        next();
    });
}

// const customer = require('./src/routes/routesCustomer');
const login = require('./src/routes/login')
const register = require('./src/routes/register')
const usersList = require('./src/routes/routeUsers')
const document = require('./src/routes/routeDocuments')

app.use('/login', login)
app.use('/register', register)

// app.use('/customer', authenticateToken, customer)
app.use('/users', usersList)
app.use('/document', document)





app.listen(process.env.PORT || 8001, () => {
    console.log("App is listing on http://localhost:8001/")
});