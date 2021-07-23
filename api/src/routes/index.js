const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const tester = require('../handlers/test');
const getCommand = require('../handlers/getCommand');
const login = require('../handlers/login');
const signup = require('../handlers/signup');
const logout = require('../handlers/logout');
const addCommand = require('../handlers/addCommand');
const allCommands = require('../handlers/allCommands');
const deleteCommand = require('../handlers/deleteCommand');

const requireLogin = require('../middlewares/requireLogin');

// GET
router.get('/test', tester);
router.get('/getCommand', getCommand);
router.get('/allCommands', requireLogin, allCommands);

// POST
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', requireLogin, logout);
router.post('/addCommand', requireLogin, addCommand);

// DELETE
router.delete('/deleteCommand/:commandId', requireLogin, deleteCommand);

module.exports = router;
