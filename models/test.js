const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.users, {
        through: 'test_users',
        foreignKey: 'test_id',
        otherKey: 'user_id',
        as: 'users_attempted_test'
      })

      this.belongsToMany(models.questions, {
        through: 'test_questions', 
        foreignKey: 'test_id',
        otherKey: 'question_id',
        as: 'questions_in_tests',
      });
    }
  }
  test.init({
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
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false 
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    modelName: 'test',
  });
  return test;
};