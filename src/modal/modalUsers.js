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

module.exports = { createUser, viewByIdUser };