'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('equipments', 'foto');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('equipments', 'foto', {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      });
  }
};
