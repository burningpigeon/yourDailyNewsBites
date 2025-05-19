const express = require('express');
const controller = require('./controller');

const router = express.Router();

// a. authenication
router.post('/auth/addUser', controller.addUser);

//b. user management
router.get('/users/getUsers', controller.getUsers);
router.get('/users/getUser', controller.getUser);
router.delete('/users/removeUser', controller.removeUser);
router.put('/users/changeEmail', controller.changeEmail);
router.put('/users/changePassword', controller.changePassword);

//c. categories
router.post('/categories/addCategory', controller.addCategory);
router.delete('/categories/removeCategory', controller.removeCategory);
router.get('/categories/getUsersCategories', controller.getUsersCategories);

module.exports = router;