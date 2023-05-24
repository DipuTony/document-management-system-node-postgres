const pool = require('../database')

const url = process.env.BASEURL;

const saveUploadDocumentDetails = async (fileDetails) => {
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO documents (originalfilename, encoding, type, destination, filename, path, size) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *';
        const values = [fileDetails.originalname, fileDetails.encoding, fileDetails.mimetype, fileDetails.destination, fileDetails.filename, fileDetails.path, fileDetails.size];
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
        // res.json({ "status": true, message: "Here is list of documents", data: result.rows });
        // client.release();

        const client = await pool.connect();
        const result = await client.query('SELECT * FROM documents');
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