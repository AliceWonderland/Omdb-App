'use strict';
var Sequelize = require('sequelize');
var db = require('../index.js');

module.exports = db.define('movies',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title:{
      type: Sequelize.STRING,
      allowNull: false
    },
    poster:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://unsplash.it/g/252/200/?random'
    },
    year:{
        type: Sequelize.STRING,
        allowNull: false
    },
    plot:{
        type: Sequelize.STRING(1234),
        allowNull: true
    },
    imdbID:{
      type: Sequelize.STRING,
      allowNull: false
  },
    rating:{
      type: Sequelize.STRING,
      allowNull: true
    },
    comment:{
      type: Sequelize.STRING(1234),
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);
