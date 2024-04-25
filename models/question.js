'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static question_and_question_response_association;
    static question_and_test_association;
    static associate(models) {
      // define association here
      this.question_and_question_response_association = question.hasMany(models.question_responses, {
        foreignKey: 'question_id',
        as: 'question_responses'
      })

      this.belongsToMany(models.tests, {
        through: 'test_questions', 
        foreignKey: 'question_id',
        otherKey: 'test_id',
        as: 'test_in_which_question_appeared',
      });
    }
  }
  question.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    correct_option: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'question',
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return question;
};