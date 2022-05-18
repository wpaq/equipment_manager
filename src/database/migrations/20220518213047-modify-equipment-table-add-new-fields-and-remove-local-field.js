'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('equipments', 'secretaria', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('equipments', 'setor', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('equipments', 'alugado', {
        type: Sequelize.BOOLEAN,
    });
    await queryInterface.removeColumn('equipments', 'local');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('equipments', 'secretaria');
    await queryInterface.removeColumn('equipments', 'setor');
    await queryInterface.removeColumn('equipments', 'alugado');
  }
};
