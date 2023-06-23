const pool = require('../database')

const url = process.env.BASEURL;

exports.getUploadFolderNameModal = async (headerToken) => {
    const client = await pool.connect();
    //Get Folder Name where files will be uploaded.
    const result = await client.query(`SELECT folder_name FROM tokens AS t
	JOIN modules AS m ON m.id = t.module_id
	JOIN folders AS f ON f.module_id = m.id
	WHERE t.token= $1`, [headerToken]);
    client.release();
    console.log("rows[0]", result.rows[0], headerToken)
    return result.rows[0]?.folder_name ? result.rows[0]?.folder_name : null;
}

exports.myDocUploadModal = async (fileDetails) => { //myDoc/upload
    // const ipAddress = req.connection.remoteAddress

    try {
        const client = await pool.connect();
        // const result = await client.query('SELECT module_id FROM tokens WHERE status = 1 AND token = $1', [fileDetails.token]);
        const result = await client.query(`SELECT f.module_id, f.id AS folder_id FROM tokens AS t
        JOIN modules AS m ON m.id = t.module_id
        JOIN folders AS f ON f.module_id = m.id
        WHERE t.status = 1 AND t.token = $1`, [fileDetails.token]);
        // return console.log("result",result.rows[0].module_id)
        const moduleId = result?.rows[0]?.module_id;
        const folderId = result?.rows[0]?.folder_id;


        /// Look into moduleId, folder_id *********


        if (moduleId && folderId) {
            const client = await pool.connect();
            const query = 'INSERT INTO documents (original_file_name, encoding, type, destination, file_name, path, size, ip_address, tags, digest, module_id, folder_id) VALUES ($1, $2, $3,$4,$5,$6,$7, $8, $9, $10, $11, $12) RETURNING *';
            const values = [fileDetails.originalname, fileDetails.encoding, fileDetails.mimetype, fileDetails.destination, fileDetails.filename, fileDetails.path, fileDetails.size, fileDetails.ipAddress, fileDetails.tags, fileDetails.computedDigest, moduleId, folderId];
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

exports.viewDocOneModal = async (id, token) => {
    try {
        const client = await pool.connect();
        const query = `SELECT d.id AS documentId, d.size, d.type, d.destination, d.file_name, d.path, d.ip_address, f.folder_token, f.folder_name, f.folder_tags, m.module_name FROM documents AS d
        JOIN folders AS f ON f.id = d.folder_id
        JOIN modules AS m ON m.id = f.module_id
        JOIN tokens AS t ON t.module_id = f.module_id
        WHERE t.status = 1 AND t.token = $1 AND d.id = $2 LIMIT 1`;
        const values = [token, id];
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


exports.viewAllDocumentsModal = async (token) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT d.id AS documentId, d.size, d.type, d.destination, d.file_name, d.path, d.ip_address, f.folder_token, f.folder_name, f.folder_tags, m.module_name FROM documents AS d
        JOIN folders AS f ON f.id = d.folder_id
        JOIN modules AS m ON m.id = f.module_id
        JOIN tokens AS t ON t.module_id = f.module_id
        WHERE t.status = 1 AND t.token = $1`, [token]);
        client.release()
        const rows = result.rows[0]
        if (rows) {
            const rows = result.rows;
            const documentsWithFullPath = rows.map((row) => {
                const fullPath = `${url}/uploads/${row.folder_name}/${row.file_name}`; // Replace with your actual document path logic
                return { ...row, fullPath };
            });
            return documentsWithFullPath;
        } else return false;

    } catch (error) {
        console.log("Error in Modal while fetching doc list")
        throw new Error('Error doc list fetch in Modal', error)
    }
}

exports.searchByTagModal = async (searchKeys) => {

    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT d.id AS documentId, d.size, d.type, d.tags AS documentTags, d.destination, d.file_name, d.path, d.ip_address, f.folder_token, f.folder_name, f.folder_tags FROM documents AS d
        JOIN folders AS f ON f.id =  d.folder_id
        WHERE d.tags LIKE $1;`, [`%${searchKeys}%`]);

        // const keysArray = searchKeys.split(',').map((key) => key.trim());
        // const placeholders = keysArray.map((_, index) => `$${index + 1}`).join(', ');

        // const query = `SELECT *
        // FROM document
        // WHERE tags LIKE ANY(ARRAY[${placeholders}]);`;
        // const result = await client.query(query, keysArray);


        client.release()
        const rows = result.rows[0]
        if (rows) {
            const rows = result.rows;
            const documentsWithFullPath = rows.map((row) => {
                const fullPath = `${url}/${row.path}`; // Replace with your actual document path logic
                return { ...row, fullPath };
            });
            return documentsWithFullPath;
        } else return false;

    } catch (error) {
        console.log("Error in Modal while fetching doc list")
        throw new Error('Error doc list fetch in Modal', error)
    }
}