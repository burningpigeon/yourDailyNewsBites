const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/getUsers', controller.getUsers);
router.get('/getUser', controller.getUser);
router.post('/addUser', controller.addUser);

module.exports = router;