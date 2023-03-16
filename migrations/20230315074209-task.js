'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Task_name: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      Task_description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      Due_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      Priorityid: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'Priorities',
          },
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:"CASCADE"
      },
      Statusid: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'Statuses',
          },
          key:'id'
        },
        onDelete:'SET NULL',
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
    await queryInterface.dropTable('Tasks');
  }
};