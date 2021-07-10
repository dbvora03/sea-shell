const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const tester = require('../handlers/test');
const getCommand = require('../handlers/getCommand');
const login = require('../handlers/login');
const signup = require('../handlers/signup');


router.get('/test', tester);
router.get('/getCommand', getCommand);
router.post('/login', login);
router.post('/signup', signup);


module.exports = router;
