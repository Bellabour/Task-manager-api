'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Userid: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        addConstraint:`Users`,
        references:{
          model:'Users',
          key:'id',
          foreignkey:'userid'
        }
      },
      Taskid: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        addConstraint:`Tasks`,
        references:{
          model:'Tasks',
          key:'id',
          foreignkey:'taskid'
        }
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
    await queryInterface.dropTable('User_Tasks');
  }
};
