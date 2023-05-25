const { saveUploadDocumentDetails, viewAllDocument } = require('../modal/documetModal')
const pool = require('../database')
const crypto = require('crypto');
const fs = require('fs');


const uploadDocument = async (req, res) => {  // POST => /document/upload
    if (!req.file || !req.headers['x-digest']) {
        // File or digest is missing, handle the error
        res.status(400).send('File or digest is missing.', req.file, req.headers['x-digest']);
        return;
    }

    const receivedDigest = req.headers['x-digest']; // Assuming the digest is sent as a request header
    const receivedFile = req.file;// File path of the uploaded file

    const filePath = receivedFile.path;

    // Read the file using fs.readFile
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Handle error
            return res.status(500).send('Error reading file.');
        }
        let key = "123"
        const computedDigest = crypto.createHash('SHA256').update(key).digest('hex');

        console.log({ "Headser": receivedDigest, "computedDigest": computedDigest, "date=>>": data, "filePath": filePath, "err": err })

        if (receivedDigest === computedDigest) {
            // Digest is valid, proceed with further processing
            handleAfterSuccess(computedDigest)
        } else {
            // Digest is invalid, handle the error
            res.status(400).send('Invalid file digest...');
        }
    });

    const handleAfterSuccess = async (computedDigest) => {
        const ipAddress = req.connection.remoteAddress;
        const { tags } = req.body; // Get tags form request
        const { originalname, encoding, mimetype, destination, filename, path, size } = req.file; // File Details
        const fileDetails = { originalname: originalname, encoding: encoding, mimetype: mimetype, destination: destination, filename: filename, path: path, size: size, ipAddress, tags, computedDigest }
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