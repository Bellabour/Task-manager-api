"use strict";
import { Model } from "sequelize";
interface UserAttributes {
  name: string;
  surname: string;
  email: string;
  password: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!: string;
    surname!: string;
    email!: string;
    password!: string;
    static associate(models: any) {
      // define association here
      User.belongsToMany(models.Task,{
        through:'UserTasks',
      })
}
    
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      surname: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
