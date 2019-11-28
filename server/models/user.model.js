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
  roles: {
    type: Sequelize.ENUM,
    values: ['User', 'Admin', 'SuperAdmin'],
    defaultValue: 'User'
  }
}, {
  timestamps: false
});

module.exports = User;