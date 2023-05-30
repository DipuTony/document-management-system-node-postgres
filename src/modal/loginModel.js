const pool = require('../database')

const registerUser = async (data) => {
    const { name, phone, email, password } = data;
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO user_infos (name, phone, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, phone, email, password];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error user registration', error);
        throw new Error('Internal Server user registration', error);
    }
};

const loginUser = async (data) => {
    const { email } = data;
    try {
        const client = await pool.connect();
        const query = 'SELECT * from user_infos where email = $1';
        const values = [email];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error user login', error);
        throw new Error('Internal Server user login', error);
    }
};



module.exports = { registerUser, loginUser }