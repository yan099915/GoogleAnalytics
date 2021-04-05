
const express = require("express");

module.exports = (sequelize, type) => {
    return sequelize.define(
      "shopping_cart",
      {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: type.INTEGER
        },
        item_id: {
          type: type.INTEGER
        },
        qty: {
          type: type.INTEGER
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

