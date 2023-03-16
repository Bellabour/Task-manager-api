'use strict';
import 
  {Model}
 from'sequelize';
 interface roleAttributes{
    role_name:string,
    role_description:string;
 }
module.exports = (sequelize:any, DataTypes:any) => {
  class Role extends Model<roleAttributes>implements Role {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    role_name!:string
    role_description!:string
    static associate(models:any) {
      // define association here
      Role.belongsToMany(models.Permission,{through:'Role_Permission',onDelete:'SET NULL',
      onUpdate:"CASCADE"})
      Role.hasMany(models.Users)
    }
  }
  Role.init({
    role_name: {type:DataTypes.STRING,allowNull:false,unique:true},
    role_description: {type:DataTypes.STRING,allowNull:false}
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};