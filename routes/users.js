const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userctrl')
const bodyParser = require('body-parser');

router.use (bodyParser.json())
router.use (bodyParser.urlencoded({extended: false}))

router.get('/user/:id', userCtrl.getUserSavedata);

router.post('/user', userCtrl.addUserSavedata);

router.put('/user', userCtrl.updateUserUid);

router.patch('/user', userCtrl.updateUserSavedata);

router.delete('/user/:id', userCtrl.deleteUserSavedata);

module.exports = router;
