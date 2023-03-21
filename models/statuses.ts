'use strict';
import
  {Model}
from'sequelize';
interface statusAttributes{
  Status_name:string
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Statuses extends Model<statusAttributes>implements statusAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    Status_name!:string
    static associate(models:any) {
      // define association here
      Statuses.hasMany(models.Tasks)
    }
  }
  Statuses.init({
    Status_name: {type:DataTypes.STRING,allowNull:false,unique:true}
  }, {
    sequelize,
    modelName: 'Statuses',
  });
  return Statuses;
};