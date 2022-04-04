const dbConfig = require('../config/dbConfig')

const { Sequelize, DataTypes } = require('sequelize')

const optionalConfig = {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}

const sequilize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSSWORD,
    optionalConfig
)

try {
    await sequilize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {}

db.Sequelize = Sequelize
db.sequilize = sequilize

db.products = require('./productModel.js')(sequilize, DataTypes)
db.reviews = require('./reviewModel.js')(sequilize, DataTypes)

db.sequilize.sync({ force: false }).then(res => {
    console.log('re-sync done')
})

module.exports = db