const express = require("express");
const router = express.Router();

const { listUsers, addUser, viewUserById, deleteUserById, updateUser } = require('../controllers/controllerUsers')

/**
 * Handles the request to list users.
 * Route: /users/view
 * Method: POST
 */
 router.route('/view').post(listUsers);

 /**
  * Handles the request to add a new user.
  * Route: /users/add
  * Method: POST
  */
 router.route('/add').post(addUser);
 
 /**
  * Handles the request to view a user by ID.
  * Route: /users/view-by-id
  * Method: POST
  */
 router.route('/view-by-id').post(viewUserById);
 
 /**
  * Handles the request to delete a user by ID.
  * Route: /users/delete
  * Method: POST
  */
 router.route('/delete').post(deleteUserById);
 
 /**
  * Handles the request to update a user.
  * Route: /users/update
  * Method: POST
  */
 router.route('/update').post(updateUser);
 



// router.route('/view').post(listUsers);
// router.route('/add').post(addUser);
// router.route('/view-by-id').post(viewUserById);
// router.route('/delete').post(deleteUserById);
// router.route('/update').post(updateUser);


module.exports = router;