const express = require("express");
const router = express.Router();

const { viewAllConsumers, addNewConsumer } = require('../controllers/controllerConsumers')


router.route('/view-all').post(viewAllConsumers);
router.route('/add').post(addNewConsumer);



module.exports = router;