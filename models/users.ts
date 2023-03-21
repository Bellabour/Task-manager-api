"use strict";
const bcrypt = require("bcrypt");

import { Model } from "sequelize";
interface userAttributes {
  Roleid: number;
  Email: string;
  Password: string;
  Fullname: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Users extends Model<userAttributes> implements userAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    Roleid!: number;
    Email!: string;
    Password!: string;
    Fullname!: string;

    comparePassword(passw: string, cb: any) {
      bcrypt.compare(
        passw,
        this.Password,
        function (err: any, isMatch: boolean) {
          if (err) {
            return cb(err);
          }
          cb(null, isMatch);
        }
      );
    }

    static associate(models: any) {
      // define association here
      Users.belongsToMany(models.Tasks, { through: "User_Tasks",onDelete:'SET NULL',
      onUpdate:"CASCADE",foreignKey:'User_id'});
      Users.belongsTo(models.Role);
    }
  }
  Users.init(
    {
      Roleid: DataTypes.INTEGER,
      Email: { type: DataTypes.STRING, allowNull: false, unique: true },
      Password: { type: DataTypes.STRING, allowNull: false },
      Fullname: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  Users.beforeSave(async (user, options) => {
    if (user.Password) {
      user.Password = bcrypt.hashSync(
        user.Password,
        bcrypt.genSaltSync(10),
        null
      );
    }
  });
  // Users.prototype.comparePassword = function (passw, cb) {
  //   bcrypt.compare(passw, this.Password, function (err, isMatch) {
  //     if (err) {
  //       return cb(err);
  //     }
  //     cb(null, isMatch);
  //   });
  // };
  return Users;
};
