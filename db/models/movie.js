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
            defaultValue: 'https://unsplash.it/g/252/200/?random',
            allowNull: false
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
            type: Sequelize.ENUM,
            values: ['0','1','2','3','4','5'], //pg only accepts strs as vals
            defaultValue: '0',
            allowNull: false
        },
        comment:{
            type: Sequelize.STRING(1234),
            defaultValue: 'Add your comments here!',
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);
