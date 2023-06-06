const express = require("express");
const router = express.Router();
const { uploadFileMulter } = require('../components/middleware/uploadMulterMiddleware');


const { uploadDocument, myDocViewOne, viewAllDocument, controllerSearchByTag } = require('../controllers/controllerMyDoc')

router.route('/upload').post(uploadFileMulter, uploadDocument);
router.route('/search-by-tag').post(controllerSearchByTag);


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
router.route('/view-all').post(viewAllDocument);

// router.route('/view').post(viewAllDocuments); // Need to work on this
// router.route('/delete').post(deleteDocument);
// router.route('/update').post(updateDocument);


module.exports = router;