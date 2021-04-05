
const express = require("express");

module.exports = (sequelize, type) => {
    return sequelize.define(
      "items",
      {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        item_name: {
          type: type.STRING(255)
        },
        price: {
          type: type.INTEGER
        },
        stock: {
          type: type.INTEGER
        },
        image: {
          type: type.STRING(1000)
        },
        created_at: type.DATE,
        updated_at: type.DATE,
      },
      {
        freezeTableName: true,
        underscored: true
      }
    );
};