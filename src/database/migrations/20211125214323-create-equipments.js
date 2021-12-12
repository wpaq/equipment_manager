'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('equipments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true        
      },
      tombo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      equipamento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      setor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      empresa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      observacao: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => { 
    return queryInterface.dropTable('equipments');
  }
};
