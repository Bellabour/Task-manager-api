'use strict';
const user = require('./user')
import
  {Model}
from'sequelize';
interface TaskAttributes {
  due: Date;
  name: string;
  description: string;
  status: string;
  priority:string
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Task extends Model<TaskAttributes> 
  implements TaskAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    due!:Date
    name!:string
    description!:string
    status!:string
    priority!:string
    static associate(models:any) {
      // define association here
 
      Task.belongsToMany(models.User,{
        through:'UserTasks',
      }) 
      Task.hasOne(models.Status)
      Task.hasOne(models.Priority)

 }
  }
  Task.init({
    due: {type:DataTypes.DATE,allowNull:false},
    name: {type:DataTypes.STRING,allowNull:false},
    description: {type:DataTypes.STRING,allowNull:false},
    status: {type:DataTypes.STRING,allowNull:false}, 
    priority:{type:DataTypes.STRING,allowNull:false}
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};