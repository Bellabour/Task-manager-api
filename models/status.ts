'use strict';
import{
  Model
} from'sequelize';
interface Statusattributes {
  name: string;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class status extends Model<Statusattributes>implements status {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!:string
    static associate(models:any) {
      // define association here
      status.hasMany(models.Task,{
        foreignKey:'status_id'
      })
    }
  }
  status.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return status;
};