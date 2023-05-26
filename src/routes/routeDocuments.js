const express = require("express");
const router = express.Router();

const multer = require('multer');

const { uploadDocument, viewAllDocuments } = require('../controllers/controllerDocuments')

const uploadedFiles = {};
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads'); // Destination folder / File uploaded folder
        },
        filename: function (req, file, cb) {

            // Generate a new file name
            const originalExtension = file.originalname.split('.').pop();
            const newFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + originalExtension;
            // const newFileName = uniqueSuffix + '-' + file.originalname;
            uploadedFiles[file.originalname] = newFileName;

            cb(null, newFileName);

            // cb(null, file.originalname);
        },
    }),
}).single('file');

router.route('/upload').post(upload, uploadDocument);
router.route('/view').post(viewAllDocuments);

// router.route('/view-by-id').post(viewUserById);
// router.route('/delete').post(deleteCustomer);
// router.route('/update').post(updateCustomer);


module.exports = router;