const express = require('express');

const router  = express.Router()
const { registerController, loginController, getMoneyByID} = require('../controller/userController')

router.get('/', (req, res, next) => {
    res.send('User api')
})
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/money', getMoneyByID);
module.exports = router;
