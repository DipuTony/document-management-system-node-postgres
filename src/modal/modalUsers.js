const pool = require('../database')

/**
 * Creates a new user in the database.
 * @param {string} name - User name.
 * @param {string} phone - User phone number.
 * @param {string} email - User email.
 * @returns {Object} - The inserted user information.
 * @throws {Error} - If there is an error while creating the user.
 */

const createUser = async (name, phone, email) => {
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO user_infos (name, phone, email) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, phone, email];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user', error);
        throw new Error('Internal Server Errorddd', error);
    }
};

/**
 * Retrieves user data from the database based on the ID.
 * @param {number} id - User ID.
 * @returns {Object} - The retrieved user information.
 * @throws {Error} - If there is an error while retrieving user data.
 */

const viewByIdUser = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM user_infos WHERE id = $1', [id]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user', error);
        throw new Error('Error in modal user viewByID.', error);
    }
};

/**
 * Deletes a user from the database based on the ID.
 * @param {number} id - User ID.
 * @returns {boolean} - True if the user is successfully deleted, false otherwise.
 * @throws {Error} - If there is an error while deleting the user.
 */

const deleteUser = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM user_infos WHERE id = $1', [id]);
        client.release();
        return result.rowCount > 0;;
    } catch (error) {
        console.error('Error deleting user', error);
        throw new Error('Error in modal user deleteUser.', error);
    }
};

/**
 * Updates user data in the database based on the ID.
 * @param {string} name - Updated user name.
 * @param {string} phone - Updated user phone number.
 * @param {string} email - Updated user email.
 * @param {number} id - User ID.
 * @returns {boolean} - True if the user is successfully updated, false otherwise.
 * @throws {Error} - If there is an error while updating the user.
 */

const modalUpdateUser = async (name, phone, email, id) => {
    try {
        const client = await pool.connect();
        const query = 'UPDATE user_infos SET name = $1, phone = $2, email = $3 WHERE id = $4';
        const values = [name, phone, email, id];
        const result = await client.query(query, values);
        client.release();
        return result.rowCount > 0;;
    } catch (error) {
        console.error('Error creating user', error);
        throw new Error('Internal Server modalUpdateUser', error);
    }
};

module.exports = { createUser, viewByIdUser, deleteUser, modalUpdateUser };