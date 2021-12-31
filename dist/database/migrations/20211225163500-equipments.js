"use strict";module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('equipments', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        tombo: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true
        },
        equipamento: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        empresa: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        local: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        responsavel: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },
  
    down: async (queryInterface) => queryInterface.dropTable('equipments'),
  };
  