require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const petModel = require('../model/petModel');

exports.ListPet = (req, res, next) => {
    petModel.findPetAll()
    .then(([rows]) => {
        res.status(200).json({
            pet: rows,
        });
    }).catch(err => {
        console.log(err);
    });
}
