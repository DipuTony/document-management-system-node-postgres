const { saveUploadDocumentDetails, viewAllDocument } = require('../modal/documetModal')
const pool = require('../database')


const uploadDocument = async (req, res) => {  // POST => /document/upload
    const ipAddress = req.connection.remoteAddress;
    const { tags } = req.body;
    const { originalname, encoding, mimetype, destination, filename, path, size } = req.file;
    const fileDetails = { originalname: originalname, encoding: encoding, mimetype: mimetype, destination: destination, filename: filename, path: path, size: size, ipAddress, tags }
    try {
        const user = await saveUploadDocumentDetails(fileDetails);
        if (user) {
            res.status(201).json({ "status": true, message: "Document Uploaded Successfully", data: user });
        } else {
            res.status(201).json({ "status": false, message: "Failed to upload document user", data: user });
        }
    } catch (error) {
        console.error('Catch Error upload document', error);
        res.status(500).json({ error: 'Internal Server Error controller Document upload', msg: error });
    }
}

const viewAllDocuments = async (req, res) => {  // POST => /document/view
    try {
        const fetchDocList = await viewAllDocument()
        if (fetchDocList) {
            res.status(201).json({ "status": true, message: "List of documents", data: fetchDocList });
        } else {
            res.status(201).json({ "status": false, message: "Failed to get doc lists", data: fetchDocList });
        }
    } catch (error) {
        console.error('Catch Error fetch doc lists document', error);
        res.status(500).json({ error: 'Internal Server Error controller Document fetch ', msg: error });
    }

}

module.exports = { uploadDocument, viewAllDocuments };