const pool = require('../database')


// const uploadDocument = async (req, res) => {  // POST => /document/upload
//     try {

//         if (res.file) {
//             res.send("File uploaded..")
//         } else {
//             res.send("Failed to File uploaded..")
//         }
//     } catch {
//         console.error("Error during file upload:", error);
//         res.status(500).send("An error occurred during file upload.");
//     }
// };

const uploadDocument = async (req, res) => {  // POST => /document/upload

    const { originalname, encoding, mimetype, destination, filename, path, size } = req.file;
    const fileDetails = {originalname:originalname, encoding:encoding, mimetype:mimetype, destination:destination, filename:filename, path:path, size:size}
    // console.log("All Response ==>> File Details =>>", originalname, filename, path, size, encoding, mimetype, destination)
    res.send({status:true, message:"File Uploaded Successfully",data:fileDetails})
}

const viewAllDocuments = async (req, res) => {  // POST => /document/view
    res.status(200).json({ message: "View Upload documents api hits.." })
}

module.exports = { uploadDocument, viewAllDocuments };