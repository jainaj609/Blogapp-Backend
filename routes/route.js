const express = require('express');
const {bollywood,hollywood,technology,fitness,food} = require('../controllers/data');
const {login,register} = require('../controllers/register');
const router = express.Router();

router.get('/bollywood',bollywood)

router.get('/hollywood',hollywood)
router.get('/technology',technology)
router.get('/fitness',fitness)
router.get('/food',food)

router.get('/login',login)
router.get('/register',register)

module.exports =router;