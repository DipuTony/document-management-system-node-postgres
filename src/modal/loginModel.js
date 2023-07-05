const pool = require('../database')

/**
 * Registers a user in the database.
 * @param {Object} data - User data including name, phone, email, and password.
 * @returns {Promise<Object>} - Returns the registered user information.
 * @throws {Error} - Throws an error if there is an issue with user registration.
 */

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

/**
 * Retrieves user information from the database based on the provided email.
 * @param {string} email - The email of the user.
 * @returns {Promise<object>} The user information object.
 * @throws {Error} If there is an error during the database operation or an internal server error occurs.
 */

const loginUser = async (email) => {
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