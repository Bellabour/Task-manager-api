"use strict";
import { Model } from "sequelize";
interface taskAttributes {
  Task_name: string;
  Task_description: string;
  Due_date: Date;
  Priorityid: number;
  Statusid: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Tasks extends Model<taskAttributes> implements taskAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    Task_name!: string;
    Task_description!: string;
    Due_date!: Date;
    Priorityid!: number;
    Statusid!: number;
    static associate(models:any) {
      // define association here
      Tasks.belongsToMany(models.Users, { through: "User_Tasks",onDelete:'SET NULL',
      onUpdate:"CASCADE"});
      Tasks.hasOne(models.Statuses, {
        foreignKey: "id",
      });
      Tasks.hasOne(models.Priorities, { foreignKey: "id" });
    }
  }
  Tasks.init(
    {
      Task_name: { type: DataTypes.STRING, allowNull: false, unique: true },
      Task_description: { type: DataTypes.STRING, allowNull: false },
      Due_date: { type: DataTypes.DATE, allowNull: true },
      Priorityid: DataTypes.INTEGER,
      Statusid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tasks",
    }
  );
  return Tasks;
};
