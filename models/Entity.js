const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User'); 

const FunnyAnswer = sequelize.define('FunnyAnswer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  funny_answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploaded_by: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  tableName: 'funny_answers',
  timestamps: false,
});

// Relationships
FunnyAnswer.belongsTo(User, { foreignKey: 'created_by' });

module.exports = FunnyAnswer;
