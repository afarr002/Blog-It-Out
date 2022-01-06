const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  passAuth(userPassword) {
    return bcrypt.compareSync(userPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
        notEmpty: true,
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (userSignupData) => {
        userSignupData.password = await bcrypt.hash(
          userSignupData.password,
          10
        );
        return userSignupData;
      },
      beforeUpdate: async (userUpdatedData) => {
        userUpdatedData.password = await bcrypt.hash(
          userUpdatedData.password,
          10
        );
        return userUpdatedData;
      },
    },
    sequelize,
    freezeTableName: true,
    modelName: "user",
  }
);

module.exports = User;
