const pool = require('../database')

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

const modalUpdateUser = async (name, phone, email, id) => {
    try {
        const client = await pool.connect();
        // const query = ('UPDATE (name, phone, email) SET ($1, $2, $3) from user_infos WHERE id = $1', [id]);
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