const User = require('./User');
const Parlay = require('./Parlay');

User.hasMany(Parlay, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Parlay.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Parlay };
