const pool = require('../database')

const url = process.env.BASEURL;

const saveUploadDocumentDetails = async (fileDetails) => {
    // const ipAddress = req.connection.remoteAddress
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO document_master (original_file_name, encoding, type, destination, file_name, path, size, ip_address, tags, digest) VALUES ($1, $2, $3,$4,$5,$6,$7, $8, $9, $10) RETURNING *';
        const values = [fileDetails.originalname, fileDetails.encoding, fileDetails.mimetype, fileDetails.destination, fileDetails.filename, fileDetails.path, fileDetails.size, fileDetails.ipAddress, fileDetails.tags, fileDetails.computedDigest];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user', error);
        throw new Error('Internal Server Error ModalDocument', error);
    }
};


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


module.exports = { saveUploadDocumentDetails, viewAllDocument };