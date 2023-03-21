'use strict';
import {
  Model
} from'sequelize';
interface user_taskAttributes{
    User_id:number,
    Task_id:number
}
module.exports = (sequelize:any, DataTypes:any) => {
  class User_Tasks extends Model<user_taskAttributes>implements user_taskAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    User_id!:number
    Task_id!:number
    static associate(models:any) {
      // define association here
    }
  }
  User_Tasks.init({
    User_id: {type:DataTypes.INTEGER,primaryKey:true},
    Task_id: {type:DataTypes.INTEGER,primaryKey:true}
  }, {
    sequelize,
    modelName: 'User_Tasks',
  });
  return User_Tasks;
};