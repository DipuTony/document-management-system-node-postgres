const express = require("express");
const router = express.Router();

const { uploadDocument, viewAllDocuments } = require('../controllers/controllerDocuments')

router.route('/upload').post(uploadDocument);
router.route('/view').post(viewAllDocuments);

// router.route('/view-by-id').post(viewUserById);
// router.route('/delete').post(deleteCustomer);
// router.route('/update').post(updateCustomer);


module.exports = router;