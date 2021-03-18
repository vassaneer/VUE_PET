const db = require('../db/db')

class petModel {
    constructor({name='', email='', password='', id=0}) {
       
    }

    static findPetAll () {
        return db.execute('SELECT * FROM `pet` ')
    }


}

module.exports = petModel;