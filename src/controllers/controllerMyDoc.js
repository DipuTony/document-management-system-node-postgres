const { saveUploadDocumentDetails, myDocUploadModal, viewDocOneModal } = require('../modal/myDocModal')
const pool = require('../database')
const crypto = require('crypto');
const fs = require('fs');
const Joi = require('joi');

// const validateTokenId = Joi.object({
//     id: Joi.string().required(),
//     token: Joi.number().min(18).required()
// }).unknown();

const { validateTokenId } = require('../components/schemas/myDoc')


const uploadDocument = async (req, res) => {  // POST => /myDoc/upload
    if (!req.file || !req.headers['x-digest']) {
        // File or digest is missing, handle the error
        res.status(400).json({ status: false, message: 'File or digest is missing.', file: req.file, header: req.headers['x-digest'] });
        return;
    }

    const receivedDigest = req.headers['x-digest']; // Assuming the digest is sent as a request header
    const receivedFile = req.file;// File path of the uploaded file
    // return

    const filePath = receivedFile.path;

    // Read the file using fs.readFile
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Handle error
            return res.status(500).json({ status: false, message: 'Error reading file.' });
        }
        let key = "123"
        const computedDigest = crypto.createHash('SHA256').update(key).digest('hex');

        // console.log({ "header": receivedDigest, "computedDigest": computedDigest, "date=>>": data, "filePath": filePath, "err": err })

        if (receivedDigest === computedDigest) {
            // Digest is valid, proceed with further processing
            handleAfterDocDigestVerify(computedDigest)
        } else {
            // Digest is invalid, handle the error
            res.status(400).json({ status: false, message: 'Invalid file digest...' });
        }
    });

    const handleAfterDocDigestVerify = async (computedDigest) => {
        const ipAddress = req.connection.remoteAddress;
        const { tags, token } = req.body; // Get tags form request
        const { originalname, encoding, mimetype, destination, filename, path, size } = req.file; // File Details
        const fileDetails = { originalname: originalname, encoding: encoding, mimetype: mimetype, destination: destination, filename: filename, path: path, size: size, ipAddress, tags, token, computedDigest }
        try {
            const result = await myDocUploadModal(fileDetails);
            if (result) {
                res.status(201).json({ status: result.status, message: result.message, data: result.date });
            }
        } catch (error) {
            console.error('Catch Error upload document', error);
            res.status(500).json({ error: 'Internal Server Error controller Document upload', msg: error });
        }
    }
}


const myDocViewOne = async (req, res) => {

    const { error, value } = validateTokenId.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(item => item.message);  //Collection Errors
        return res.status(400).json({ error: errorMessages });
    }

    const { id, token, address } = req.body;
    console.log("id, token, address", id, token, address)
    try {
        const result = await viewDocOneModal(id, token);
        if (result) {
            res.status(201).json({ "status": true, message: "Document Details", data: result });
        } else {
            res.status(201).json({ "status": false, message: "No Data Found", data: [] });
        }
    } catch (error) {
        console.error('Catch Error fetch one document', error);
        res.status(500).json({ error: 'Internal Server Error controller fetch one document ', msg: error });
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

module.exports = { uploadDocument, viewAllDocuments, myDocViewOne };