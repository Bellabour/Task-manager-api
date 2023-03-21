'use strict';
import{
  Model
} from'sequelize';
interface priorityAttributes{
  Priority_name:string;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Priorities extends Model<priorityAttributes>implements Priorities{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    Priority_name!:string
    static associate(models:any) {
      // define association here
      Priorities.hasMany(models.Tasks)
    }
  }
  Priorities.init({
    Priority_name: {type:DataTypes.STRING,allowNull:true,unique:true}
  }, {
    sequelize,
    modelName: 'Priorities',
  });
  return Priorities;
};