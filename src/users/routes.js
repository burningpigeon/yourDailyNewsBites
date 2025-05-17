const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/getUsers', controller.getUsers);
router.get('/getUser', controller.getUser);
router.post('/addUser', controller.addUser);
router.delete('/removeUser', controller.removeUser);
router.put('/changeEmail', controller.changeEmail);
router.put('/changePassword', controller.changePassword);

module.exports = router;