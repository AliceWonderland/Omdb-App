'use strict';
var Sequelize = require('sequelize');
var db = require('../index.js');

module.exports = db.define('movies',
  {
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
        type: Sequelize.BLOB,
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
      type: Sequelize.BLOB,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);
