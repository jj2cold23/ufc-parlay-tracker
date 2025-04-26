const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Parlay extends Model {}

Parlay.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  picks: { type: DataTypes.TEXT },
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: 'user', key: 'id' }
  }
}, {
  sequelize,
  modelName: 'parlay',
  timestamps: true
});

module.exports = Parlay;
