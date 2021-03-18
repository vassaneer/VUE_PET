require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../model/userModel');

exports.registerController = (req, res, next) => {
    const { name,email, password} = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => {
            const User = new UserModel({name:name ,email:email ,password: hash})
            User.registerUser()
                .then(() => {
                    res.status(201)
                    .json({
                        message:'success'
                    })
                }).catch((error) => {
                    res.status(500)
                        .json({
                            message:error
                        })
                })
        })
        .catch((error) => {
            res.status(500)
            .json({
                message:error
            })
        })
}

exports.loginController = (req, res, next) => {
    const { name, password} = req.body;
    UserModel.findUserByName({name:name})
        .then(([row]) => {
            if(row.length !== 0) {
                return bcrypt.compare(password, row[0].password)
                    .then((result) => {
                        if(!result) {
                            res.status(401)
                                .json({
                                    message: "Authentication failed"
                                })
                        } else {
                            let jwtToken = jwt.sign({
                                name: row[0].name,
                                userId: row[0].id
                            },
                            "create-authen-nodejs", {
                                expiresIn: "1h"
                            });
                            res.status(200).json({
                                token: jwtToken,
                                expiresIn: 3600,
                                id: row[0].id
                            });
                        }
                    }).catch((error) => {
                        res.status(401)
                            .json({
                                message: "Authentication failed",
                                error:error
                            })
                    })
            } else {
                res.status(401)
                .json({
                    message: "Authentication failed"
                })
            }
        })
        .catch((error) => {
            res.status(500)
            .json({
                message:error
            })
        })
}

exports.getMoneyByID = (req, res, next) => {
    const { user_id } = req.body;
    UserModel.findMoneyById({user_id:user_id})
        .then(([rows]) => {
            res.status(200).json({
                money: rows[0].money,
            });
        }).catch(err => {
            console.log(err);
        });
}