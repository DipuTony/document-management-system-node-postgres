const express = require("express");
const router = express.Router();

const multer = require('multer');

const { uploadDocument, viewAllDocuments } = require('../controllers/controllerDocuments')


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + "-" + Date.now() + '.' + file.originalname.split('.').pop())
        }
    })
}).single("file_this");

router.route('/upload').post(upload, uploadDocument);
router.route('/view').post(viewAllDocuments);

// router.route('/view-by-id').post(viewUserById);
// router.route('/delete').post(deleteCustomer);
// router.route('/update').post(updateCustomer);


module.exports = router;