const pool = require('../database')


const viewAllConsumerModal = async () => { // consumer/view-all
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT module_master.id, ref_document_tokens.token, module_master.module_name, ref_document_tokens.status FROM module_master JOIN ref_document_tokens ON module_master.id = ref_document_tokens.module_id WHERE ref_document_tokens.status = 1");
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
        const moduleQuery = "SELECT module_master.id, ref_document_tokens.token, module_master.module_name, ref_document_tokens.status FROM module_master JOIN ref_document_tokens ON module_master.id = ref_document_tokens.module_id WHERE ref_document_tokens.status = 1 AND module_master.id = $1";
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

        const moduleQuery = 'INSERT INTO module_master (module_name) VALUES ($1) RETURNING *';
        const moduleValues = [module];
        const result = await client.query(moduleQuery, moduleValues);
        const tokenQuery = 'INSERT INTO ref_document_tokens (token, module_id) VALUES ($1, $2)';
        const tokenValues = [token, result.rows[0].id];
        await client.query(tokenQuery, tokenValues);
        client.release();
        return { success: true };
    } catch (error) {
        console.error('Error creating consumer', error);
        throw new Error('Internal Server modal consumer add', error);
    }
}


module.exports = { viewAllConsumerModal, createConsumerModal, viewOneConsumerModal };