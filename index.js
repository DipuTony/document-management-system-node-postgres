const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
let cors = require("cors");
const path = require('path'); // View Document
require('dotenv').config();

const baseurl = process.env.BASEURL;

app.use(express.json()) // for parsing application/json
// Middleware to parse the request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request body

// Your secret key for signing the JSON Web Token
const secretKey = 'mysecretkey';


app.use(cors());

app.get('/', (req, res, next) => {
    console.log("API Call Started")
    next();
});
app.get('/', (req, res, next) => {
    res.send("DMS Node Express Backend Running..")
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

//in this the '/uploads' is route to access the file and 'uploads' is the folder where we have stored the documents.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const login = require('./src/routes/login')
const register = require('./src/routes/register')
const usersList = require('./src/routes/routeUsers')
const consumerRoute = require('./src/routes/routeConsumer')
const myDocRoute = require('./src/routes/myDocRoute')

app.use('/login', login)
app.use('/register', register)
app.use('/users', usersList)
app.use('/admin/consumer', consumerRoute)
app.use('/myDoc', myDocRoute)

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`App is listing on :${baseurl}/`)
});