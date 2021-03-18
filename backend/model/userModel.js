const db = require('../db/db')

class UserModel {
    constructor({name='', email='', password='', id=0}) {
       	this.name = name;
	    this.email = email;
        this.password = password;
        this.id = id;
        this.created = new Date();
        this.updated = new Date();
    }

    registerUser() {
        return db.execute('INSERT INTO user (name, email, password, created, updated) VALUES(?, ?, ?, ?, ?)',
        [this.name, this.email, this.password, this.created, this.updated])
    }

    static findUserByName ({name=''}) {
        return db.execute('SELECT * FROM user WHERE user.name = ?',[name])
    }

    static findMoneyById ({user_id=''}) {
        return db.execute('SELECT money FROM user WHERE user.id = ?',[user_id])
    }


}

module.exports = UserModel;
