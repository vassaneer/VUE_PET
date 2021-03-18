const express = require('express');

const router  = express.Router()
const { ListPet } = require('../controller/petController')

router.get('/pet/all', ListPet);

module.exports = router;
