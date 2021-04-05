require("dotenv").config();

const { sequelize, model } = require('../configs/database');

module.exports = {
  findUser: async (email) => {
    email.toUpperCase;
    return await model.Users.findAll({
      where: { email: email },
    });
  },

  insert: async ( email, password) => {
      return await model.Users.create({
        email,
        password,
        roles: 0
      }); 
  },

  updateUser: async (id, email, full_name, address, phone) => {
    return await model.Users.update({
        email,
        full_name,
        address,
        phone,

    },{
        where: {id: id}
    });
  },

  addItem: async (item_name, price, stock, image) => {
    return await model.Items.create({
        item_name,
        price,
        stock,
        image
    });
  },

  upload: async (id, image) => {
    console.log(id,image);
    return await model.Items.update({
      image
    },{
      where: {id: id}
    });
  },

  getList: async (item_name) => {
    return await model.Items.findAll();
  },
};

