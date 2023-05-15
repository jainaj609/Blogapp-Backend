const express = require('express');
const {bollywood,hollywood,technology,fitness,food} = require('../controllers/data');
const {login,register} = require('../controllers/register');
const router = express.Router();
const verification = require('../middleware/middleware')

router.get('/bollywood',verification,bollywood)
router.get('/hollywood',verification,hollywood)
router.get('/technology',verification,technology)
router.get('/fitness',verification,fitness)
router.get('/food',verification,food)

router.post('/login',login)
router.post('/register',register)

module.exports =router;