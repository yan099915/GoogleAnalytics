// import dependencies
require("dotenv").config();
const Sequelize = require("sequelize");
const UserModel = require("../models/users");
const ItemsModel = require("../models/items");
const model = {};

// setting database
const {DATABASE_URL} = process.env;

sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  }
});

// test connection
sequelize
  .authenticate()
  .then((res) => {
    console.log("CONNECTION_SUCCESS");
  })
  .catch((err) => console.log("FAILED_TO_CONNECT ", err));

model.Users = UserModel(sequelize, Sequelize);
model.Items = ItemsModel(sequelize, Sequelize);

// movies has many reviews
// model.Movies.hasMany(model.Reviews, {
//   foreignKey: "movie_id"
// })
// model.Reviews.belongsTo(model.Movies, {foreignKey : "movie_id"})

module.exports = {
  sequelize,
  model,
};
