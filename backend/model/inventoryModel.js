const db = require('../db/db')

class inventoryModel {
    constructor({user_id='', shop_id='', amount=0}) {
       	this.user_id = user_id;
        this.shop_id = shop_id;
        this.amount = amount;
    }

    buy() {
        return db.execute('CALL buyItem(?, ?)',
        [this.user_id, this.shop_id])
    }

    static  findShopByName ({name_shop}) {
        return db.execute('SELECT * FROM `shop` WHERE `name` = ?',[name_shop])
    }

    static findShop(){
        return db.execute('SELECT * FROM `shop` ')
    }

    static findInventoryById({user_id}){
        return db.execute('SELECT * FROM `inventory` i inner join `shop` s on i.shop_id = s.id WHERE `user_id` = ?',[user_id])
    }
}

module.exports = inventoryModel;
