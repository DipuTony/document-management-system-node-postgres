const pool = require('../database')

const url = process.env.BASEURL;

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

const createConsumerModal = async (token, module) => {

    try {
        const client = await pool.connect();


        // Insert into another table (replace `another_table` with the actual table name)
        const moduleQuery = 'INSERT INTO module_master (module_name) VALUES ($1) RETURNING *';
        const moduleValues = [module];
        // await client.query(moduleQuery, moduleValues);
        const result = await client.query(moduleQuery, moduleValues);
        // client.release();
        // return console.log("date is", result.rows[0].id)

        // Insert into ref_document_tokens table
        const tokenQuery = 'INSERT INTO ref_document_tokens (token, module_id) VALUES ($1, $2)';
        const tokenValues = [token, result.rows[0].id];
        await client.query(tokenQuery, tokenValues);



        client.release();
        return { success: true };
    } catch (error) {
        console.error('Error creating consumer', error);
        throw new Error('Internal Server modal consumer add', error);
    }

    // try {
    //     const client = await pool.connect();
    //     const query = 'INSERT INTO ref_document_tokens (token) VALUES ($1) AND ';
    //     const values = [token, module];
    //     const result = await client.query(query, values);
    //     client.release();
    //     return result.rows[0];
    // } catch (error) {
    //     console.error('Error creating consumer', error);
    //     throw new Error('Internal Server modal consumer add', error);
    // }
}


module.exports = { viewAllConsumerModal, createConsumerModal };