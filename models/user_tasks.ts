'use strict';
import {
  Model
} from'sequelize';
interface user_taskAttributes{
    Userid:number,
    Taskid:number
}
module.exports = (sequelize:any, DataTypes:any) => {
  class User_Tasks extends Model<user_taskAttributes>implements user_taskAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    Userid!:number
    Taskid!:number
    static associate(models:any) {
      // define association here
    }
  }
  User_Tasks.init({
    Userid: {type:DataTypes.INTEGER,primaryKey:true},
    Taskid: {type:DataTypes.INTEGER,primaryKey:true}
  }, {
    sequelize,
    modelName: 'User_Tasks',
  });
  return User_Tasks;
};