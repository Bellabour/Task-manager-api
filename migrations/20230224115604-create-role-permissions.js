'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Role_Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Roleid: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        addConstraint:`Roles`,
        references:{
          model:'Roles',
          key:'id',
          foreignkey:'Roleid'
        },
      onDelete:'CASCADE',
      onUpdate:"CASCADE"
      },
      Permissionid: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        addConstraint:`Permissions`,
        references:{
          model:'Permissions',
          key:'id',
          foreignkey:'permissionid'
        },
      onDelete:'CASCADE',
      onUpdate:"CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Role_Permissions');
  }
};