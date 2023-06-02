const express = require("express");
const router = express.Router();

const { viewAllConsumers, addNewConsumer,viewOneConsumers } = require('../controllers/controllerConsumers')


router.route('/view-all').post(viewAllConsumers);
router.route('/view-one').post(viewOneConsumers);
router.route('/add').post(addNewConsumer);



module.exports = router;