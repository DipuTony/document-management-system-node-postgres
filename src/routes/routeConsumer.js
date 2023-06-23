const express = require("express");
const router = express.Router();

const { viewAllConsumers, addNewConsumer, viewOneConsumers, viewDocsController } = require('../controllers/controllerConsumers')


router.route('/view-all').post(viewAllConsumers);
router.route('/view-one').post(viewOneConsumers);
router.route('/add').post(addNewConsumer);
router.route('/documents').post(viewDocsController);



module.exports = router;