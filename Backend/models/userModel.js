
require('dotenv').config();
const sequelize = require('../config/db');
const {UUID, UUIDV4} = require('sequelize');
const { Sequelize, DataTypes, Model } = require('sequelize');
const { Module } = require('module');

// module.exports = function mapUser(sequelize) {
//   User.init({
      
    
      
//   }, {
//     sequelize,
//     tableName: 'Users',
//     timestamps: true
//   });
//   User.sync();
// }

const User = sequelize.define('User', {
      // Model attributes are defined here
      id: {
            type: DataTypes.BIGINT(), 
            autoIncrement: true,
            primaryKey: true
            },
      user_id: {
              type: DataTypes.UUID,
              defaultValue: DataTypes.UUIDV4(), 
              allowNull: true,
              primaryKey: true
            },
      account_type: {
            type: DataTypes.ENUM('farmer/investor', 'supplier', 'labour_agency', 'logistics', 'buyers_of_product', 'standard_authority'),
            allowNull: false
          },
    name: {
            type: DataTypes.STRING,
            allowNull: false

          },
    date_of_birth: {
            type: DataTypes.STRING(255),
            allowNull: false

          },
    mobile_number: {
          type: DataTypes.NUMBER,
          allowNull: false

          },
    email: {
          type: DataTypes.STRING(255),
          allowNull: false

          },
    location: {
          type: DataTypes.STRING(255),
          allowNull: false

          },
    next_of_kin: {
          type: DataTypes.STRING(255),
          allowNull: true

          },
    national_id: {
          type: DataTypes.STRING(255),
          allowNull: false

          },
    payment_option: {
          type: DataTypes.ENUM('mobile_money', 'bank_transfer', 'visa/mastercard'),
          allowNull: false

          },
    password: {
            type: DataTypes.STRING(255),
            allowNull: false
            
          },
    }, {
      // Other model options go here
      sequelize,
      tableName: 'Users',
      timestamps: true,
      modelName: 'Users'
    });
    
    User.sync();
    
    module.exports = User;
    

