const pool = require('../database')


const viewAllConsumerModal = async () => { // consumer/view-all
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT modules.id, tokens.token, modules.module_name, tokens.status FROM modules JOIN tokens ON modules.id = tokens.module_id WHERE tokens.status = 1");
        client.release()
        const rows = result.rows;

        return rows;
    } catch (error) {
        console.log("Error in Modal while fetching doc list")
        throw new Error('Error doc list fetch in Modal', error)
    }
}
const viewAllDocumentsModal = async (body) => { // consumer/view-all
    // console.log("body", typeof (body), body)
    if (Object.keys(body).length === 0) {
        console.log("No body found", Object.keys(body).length)
    } else {

        console.log("Body hai", body.moduleId)
    }
    try {
        const client = await pool.connect();
        let result;
        if (Object.keys(body).length === 0) {
            console.log("No body found", Object.keys(body).length)
            result = await client.query(`SELECT d.id AS documentId, d.size, d.type, d.destination, d.file_name, d.path, d.ip_address, f.folder_token, f.folder_name, f.folder_tags, m.module_name FROM documents AS d
            JOIN folders AS f ON f.id = d.folder_id
            JOIN modules AS m ON m.id = f.module_id
            JOIN tokens AS t ON t.module_id = f.module_id
            WHERE t.status = 1`);
        } else {
            console.log("body found", Object.keys(body), body.moduleId)
            result = await client.query(`SELECT d.id AS documentId, d.size, d.type, d.destination, d.file_name, d.path, d.ip_address, f.folder_token, f.folder_name, f.folder_tags, m.module_name FROM documents AS d
            JOIN folders AS f ON f.id = d.folder_id
            JOIN modules AS m ON m.id = f.module_id
            JOIN tokens AS t ON t.module_id = f.module_id
            WHERE t.status = 1 AND m.id = $1`, [body.moduleId]);
        }
        client.release()
        const rows = result.rows;

        return rows;
    } catch (error) {
        console.log("Error in Modal while fetching doc list")
        throw new Error('Error doc list fetch in Modal', error)
    }
}
const viewOneConsumerModal = async (id) => { // consumer/view-one
    try {
        const client = await pool.connect();
        const moduleQuery = "SELECT modules.id, tokens.token, modules.module_name, tokens.status FROM modules JOIN tokens ON modules.id = tokens.module_id WHERE tokens.status = 1 AND modules.id = $1";
        const moduleValues = [id];
        const result = await client.query(moduleQuery, moduleValues);
        client.release()
        const rows = result.rows;
        console.log(rows)
        return rows;
    } catch (error) {
        console.log("Error in Modal while fetching doc list")
        throw new Error('Error doc list fetch in Modal', error)
    }
}

const createConsumerModal = async (token, module) => {

    try {
        const client = await pool.connect();

        const moduleQuery = 'INSERT INTO modules (module_name) VALUES ($1) RETURNING *';
        const moduleValues = [module];
        const result = await client.query(moduleQuery, moduleValues);
        const tokenQuery = 'INSERT INTO tokens (token, module_id) VALUES ($1, $2)';
        const tokenValues = [token, result.rows[0].id];
        await client.query(tokenQuery, tokenValues);
        client.release();
        return { success: true };
    } catch (error) {
        console.error('Error creating consumer', error.message);
        throw new Error('Internal Server modal consumer add', error);
    }
}


module.exports = { viewAllConsumerModal, createConsumerModal, viewOneConsumerModal, viewAllDocumentsModal };