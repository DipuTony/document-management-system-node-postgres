
const multer = require('multer');
const pool = require('../database')


// / Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination directory for uploaded files
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Set the filename for uploaded files
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

// Create multer upload instance
const upload = multer({ storage });

// Handle file upload route
// app.post('/upload', upload.single('file'), async (req, res) => {
const uploadDocument = async (req, res) => {  // POST => /document/upload
    upload.single('file')(req, res, (err) => {

        if (!req.file) {
            return res.status(400).json({Error:'No file uploaded.'});
        }

        const { filename, size } = req.file;

        try {
            // Insert the file details into the database
            const result = pool.query(
                'INSERT INTO documents (filename, size) VALUES ($1, $2) RETURNING id',
                [filename, size]
            );

            const fileId = result.rows[0].id;

            res.send(`File uploaded: ${filename}, ${size} bytes. File ID: ${fileId}`);
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).send('Error uploading file.');
        }
    })
};


// const uploadDocument = async (req, res) => {  // POST => /document/upload
// res.status(200).json({ message: "Upload api hits.." })
// }



const viewAllDocuments = async (req, res) => {  // POST => /document/view
    res.status(200).json({ message: "View Upload documents api hits.." })
}

module.exports = { uploadDocument, viewAllDocuments };