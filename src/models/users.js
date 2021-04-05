
const express = require("express");

module.exports = (sequelize, type) => {
    return sequelize.define(
      "users",
      {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: type.STRING(255),
        },
        password: {
          type: type.STRING(255),
        },
        full_name: {
          type: type.STRING(255)
        },
        address: {
          type: type.STRING(255)
        },
        phone: {
          type: type.STRING(255)
        },
        roles: {
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