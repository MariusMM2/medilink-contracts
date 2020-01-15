const Sequelize = require("sequelize");
const db = require("../db/db_connection");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    minlength: 8
  },
  emailVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    trim: true,
    defaultValue: 'Member'
  },
  notificationEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  proposedRole: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
    defaultValue: 'Member'
  },
  loggedTries: {
    type: Sequelize.INTEGER,
    defaultValue: '0'
  }
}, {
  timestamps: false
});

module.exports = User;
