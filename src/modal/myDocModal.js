const pool = require('../database')

const url = process.env.BASEURL;

const myDocUploadModal = async (fileDetails) => { //myDoc/upload
    // const ipAddress = req.connection.remoteAddress

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT module_id FROM ref_document_tokens WHERE status = 1 AND token = $1', [fileDetails.token]);
        // return console.log("result",result.rows[0].module_id)
        const moduleId = result?.rows[0]?.module_id;
        if (moduleId) {
            const client = await pool.connect();
            const query = 'INSERT INTO document_master (original_file_name, encoding, type, destination, file_name, path, size, ip_address, tags, digest, module_id) VALUES ($1, $2, $3,$4,$5,$6,$7, $8, $9, $10, $11) RETURNING *';
            const values = [fileDetails.originalname, fileDetails.encoding, fileDetails.mimetype, fileDetails.destination, fileDetails.filename, fileDetails.path, fileDetails.size, fileDetails.ipAddress, fileDetails.tags, fileDetails.computedDigest, moduleId];
            const result = await client.query(query, values);
            client.release();
            if (result.rows[0]) return { status: true, message: "Document Upload Success." }
        } else {
            client.release()
            return { status: false, message: "Token Not Found or Expired" }
        }
    } catch (error) {
        console.error('Error creating user', error);
        throw new Error('Internal Server Error ModalDocument', error);
    }
};

const viewDocOneModal = async (id, token) => {
    try {
        const client = await pool.connect();
        const query = `SELECT y.id,y.digest,y.created_at,y.path, y.tags, x.module_id FROM document_master AS y 
        JOIN ref_document_tokens AS x ON x.module_id = y.module_id
        WHERE y.id = $1
        AND x.token = $2
        AND x.status = 1
        LIMIT 1`;
        const values = [id, token];
        const result = await client.query(query, values)
        const rows = result.rows[0]
        if (rows) {
            const fullPath = `${url}/${rows?.path}`
            const documentsWithFullPath = { ...rows, fullPath }
            return documentsWithFullPath;
        } else return false;

    } catch (error) {
        console.log("Error Fetch one doc in Modal ==>", error)
        throw new Error('Error Fetch one doc in Modal', error)
    }
}


const viewAllDocument = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM document_master');
        client.release()
        const rows = result.rows;
        const documentsWithFullPath = rows.map((row) => {
            const fullPath = `${url}/${row.path}`; // Replace with your actual document path logic
            return { ...row, fullPath };
        });

        return documentsWithFullPath;
    } catch (error) {
        console.log("Error in Modal while fetching doc list")
        throw new Error('Error doc list fetch in Modal', error)
    }
}


module.exports = { myDocUploadModal, viewAllDocument, viewDocOneModal };