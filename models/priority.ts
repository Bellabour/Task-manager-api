'use strict';
import {
  Model
} from 'sequelize';
interface Priorityattributes {
  name: string;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class priority extends Model<Priorityattributes>implements Priorityattributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!:string
    static associate(models:any) {
      // define association here
      priority.belongsToMany(models.User,{
        through:'user',
        foreignKey:'priority_id'
        
      })
    }
  }
  priority.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'priority',
  });
  return priority;
};