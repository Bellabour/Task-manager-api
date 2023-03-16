'use strict';
import
  {Model}
from'sequelize';
interface role_permissionAttributes{
    Roleid:number,
    Permissionid:number
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Role_Permission extends Model<role_permissionAttributes>implements role_permissionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    Roleid!:number
    Permissionid!:number
    static associate(models:any) {
      // define association here
    }
  }
  Role_Permission.init({
    Roleid: {type:DataTypes.INTEGER},
    Permissionid: {type:DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'Role_Permission',
  });
  return Role_Permission;
};