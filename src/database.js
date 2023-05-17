const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'Learning',
    password: '123',
    port: 5432 // default PostgreSQL port
});

const checkConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL');
        client.release();
    } catch (error) {
        console.error('Failed to connect to PostgreSQL', error);
    }
};


checkConnection(); //This function will check the connection

module.exports = pool;



// var mongoose = require('mongoose');
// // mongoose.connect('mongodb://localhost:27017/whatsapp', { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://dsingh197:Dipu100k@cluster0.vfepxdx.mongodb.net/test', { useNewUrlParser: true });
// var conn = mongoose.connection;
// conn.on('connected', function () {
//     console.log('database is connected successfully');
// });
// conn.on('disconnected', function () {
//     console.log('database is disconnected successfully');
// })


// pool.on('error', console.error.bind(console, 'connection error:'));