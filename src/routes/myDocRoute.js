const express = require("express");
const router = express.Router();

const multer = require('multer');

const { uploadDocument, viewAllDocuments, myDocViewOne } = require('../controllers/controllerMyDoc')

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
            uploadedFiles[file.originalname] = newFileName;
            cb(null, newFileName);
            // cb(null, file.originalname);
        },
    }),
}).single('file');

router.route('/upload').post(upload, uploadDocument);





/**
 * @swagger
 * /myDoc/view-one/:
 *   post:
 *     tags: [myDoc]
 *     summary: Consumer can access single document
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#src/components/schemas/myDoc.js'
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 */
router.route('/view-one').post(myDocViewOne);

router.route('/view').post(viewAllDocuments); // Need to work on this

// router.route('/view-one').post(viewOneDocument);
// router.route('/delete').post(deleteDocument);
// router.route('/update').post(updateDocument);


module.exports = router;