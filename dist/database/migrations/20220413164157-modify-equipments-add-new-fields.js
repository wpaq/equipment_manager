"use strict";'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('equipments', 'configuracao', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('equipments', 'data_verificacao', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('equipments', 'configuracao');
    await queryInterface.removeColumn('equipments', 'data_verificacao');
  }
};
