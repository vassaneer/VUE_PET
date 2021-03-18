require('dotenv').config()
const db = require('mysql2')

const Database = db.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    database:process.env.DATABASE_DATA,
    password:process.env.DATABASE_PASS,
})

console.log(process.env.DATABASE_HOST)

module.exports = Database.promise();
