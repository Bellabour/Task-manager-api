'use strict';
import
  {Model}
from 'sequelize';
interface permissionAttributes{
    permission_name:string,
    permission_description:string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Permission extends Model<permissionAttributes>implements permissionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    permission_name!:string
    permission_description!:string
    static associate(models:any) {
      // define association here
      Permission.belongsToMany(models.Role,{through:'Role_Permission',onDelete:'SET NULL',
      onUpdate:"CASCADE"})
    }
  }
  Permission.init({
    permission_name: {type:DataTypes.STRING,allowNull:false,unique:true},
    permission_description: {type:DataTypes.STRING,allowNull:false}
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};