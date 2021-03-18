const express = require('express');

const router  = express.Router()
const { buyItem, ListShop, ListInventory } = require('../controller/inventoryController')

router.post('/shop/select', buyItem)
router.get('/shop/all', ListShop)
router.post('/inventory/all', ListInventory)

module.exports = router;