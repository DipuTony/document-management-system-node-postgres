const express = require("express");
const router = express.Router();

const { listUsers, addUser, viewUserById } = require('../controllers/controllerUsers')

router.route('/view').post(listUsers);
router.route('/add').post(addUser);
router.route('/view-by-id').post(viewUserById);
// router.route('/delete').post(deleteCustomer);
// router.route('/update').post(updateCustomer);


module.exports = router;