require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const inventoryModel = require('../model/inventoryModel');

exports.buyItem = (req, res, next) => {
    const { user_id, shop_id } = req.body;
    console.log(shop_id);
    // insert into inventory by user_id, shop_id, amount+=1
    const inventory = new inventoryModel({user_id:user_id ,shop_id:shop_id})
    inventory.buy()
    .then(([rows]) => {
        console.log(rows)
        if (rows[0].completed==1){
            res.status(201)
            .json({
                message:'success'
            })
        }else{
            res.status(201)
            .json({
                message:'fail'
            })
        }
    }).catch((error) => {
        res.status(500)
            .json({
                message:error
            })
    })
}

exports.ListShop = (req, res, next) => {
    inventoryModel.findShop()
    .then(([rows]) => {
        res.status(200).json({
            shop: rows,
        });
    }).catch(err => {
        console.log(err);
    });
}


exports.ListInventory = (req, res, next) => {
    const {user_id} = req.body
    console.log(user_id);
    inventoryModel.findInventoryById({user_id:user_id})
    .then(([rows]) => {
        res.status(200).json({
            inventory: rows,
        });
    }).catch(err => {
        console.log(err);
    });
}