const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userctrl')
const bodyParser = require('body-parser');
const session = require('express-session');

router.use (bodyParser.json())
router.use (bodyParser.urlencoded({extended: false}))

/* GET users listing. */
router.get('/user', userCtrl.getUserSavedata);

router.post('/user', userCtrl.addUserSavedata);

router.put('/user', userCtrl.updateUserSavedata);

router.delete('/user', userCtrl.deleteUserSavedata);

module.exports = router;
