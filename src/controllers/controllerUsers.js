const pool = require('../database')
const { createUser, viewByIdUser, deleteUser, modalUpdateUser } = require('../modal/modalUsers')

const listUsers = async (req, res) => {       ////   /users/view => POST
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM user_infos');
        res.json({ "status": true, message: "Here is list of users", data: result.rows });
        client.release();
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addUser = async (req, res) => { // POST => users/add
    const { name, phone, email } = req.body;
    try {
        const user = await createUser(name, phone, email);
        if(user){
            res.status(201).json({ "status": true, message: "User Created Successfully", data: user });
        }else{
            res.status(201).json({ "status": false, message: "Failed to Created user", data: user });
        }
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ error: 'Internal Server Error', msg: error });
    }
}
const viewUserById = async (req, res) => { // POST => users/view-by-id
    const { id } = req.body;
    try {
        const userByID = await viewByIdUser(id);
        if (userByID) {
            res.status(201).json({ "status": true, message: "View user which id is : " + id, data: userByID });
        } else {
            res.status(201).json({ "status": false, message: "No Data Found against : " + id });
        }
    } catch (error) {
        console.error('Error view by id user', error);
        res.status(500).json({ error: 'Error in View by id controller', payload: req.body, msg: error });
    }
}
const deleteUserById = async (req, res) => { // POST => users/delete
    const { id } = req.body;
    try {
        const userByID = await deleteUser(id);
        if (userByID) {
            res.status(201).json({ "status": true, message: "User Deleted successfully : " + id, data: userByID });
        } else {
            res.status(201).json({ "status": false, message: "Failed to delete user : " + id });
        }
    } catch (error) {
        console.error('Error view by id user', error);
        res.status(500).json({ error: 'Error in View by id controller', payload: req.body, msg: error });
    }
}

const updateUser = async (req, res) => { // POST => users/update
    const { name, phone, email, id } = req.body;
    try {
        const user = await modalUpdateUser(name, phone, email, id);
        if(user){
            res.status(201).json({ "status": true, message: "User Update Successfully", data: user });
        }else{
            res.status(201).json({ "status": false, message: "Failed to Update user", data: user });
        }
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ error: 'Internal Server Error in controllerUser updateUser', msg: error });
    }
}

module.exports = { listUsers, addUser, viewUserById, deleteUserById, updateUser };