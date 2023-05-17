const pool = require('../database')
const { createUser, viewByIdUser } = require('../modal/modalUsers')

const listUsers = async (req, res) => {       ////   /users/view => POST
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM user_infos');
        res.json(result.rows);
        client.release();
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addUser = async (req, res) => { // POST => users/add
    const { name, phone, email } = req.body;
    try {
        const user = await createUser(name,phone, email);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ error: 'Internal Server Error', msg:error });
    }
}
const viewUserById = async (req, res) => { // POST => users/view-by-id
    const { id } = req.body;
    try {
        const userByID = await viewByIdUser(id);
        res.status(201).json(userByID);
    } catch (error) {
        console.error('Error view by id user', error);
        res.status(500).json({ error: 'Error in View by id controller',payload:req.body, msg:error });
    }
}

module.exports = { listUsers, addUser, viewUserById };