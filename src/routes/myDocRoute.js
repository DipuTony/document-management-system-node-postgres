const express = require("express");
const router = express.Router();
const { uploadFileMulter } = require('../components/middleware/uploadMulterMiddleware');


const { uploadDocument, myDocViewOne, viewAllDocument, controllerSearchByTag } = require('../controllers/controllerMyDoc')

router.route('/upload').post(uploadFileMulter, uploadDocument);
router.route('/search-by-tag').post(controllerSearchByTag);

router.route('/view-one').post(myDocViewOne);
router.route('/view-all').post(viewAllDocument);

// router.route('/view').post(viewAllDocuments); // Need to work on this
// router.route('/delete').post(deleteDocument);
// router.route('/update').post(updateDocument);


module.exports = router;