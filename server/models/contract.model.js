const Sequelize = require("sequelize");
const db = require("../db/db_connection");

const Contract = db.define("contracts", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    required: true,
    trim: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  expirationDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  file: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: 1
    // allowNull: false,
    // required: true
  }
}, {
  timestamps: false
});

module.exports = Contract;
