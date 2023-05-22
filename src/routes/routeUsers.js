const express = require("express");
const router = express.Router();

const { listUsers, addUser, viewUserById, deleteUserById, updateUser } = require('../controllers/controllerUsers')

router.route('/view').post(listUsers);
router.route('/add').post(addUser);
router.route('/view-by-id').post(viewUserById);
router.route('/delete').post(deleteUserById);
router.route('/update').post(updateUser);


module.exports = router;