"use strict";'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('qrcode_images', 'equipment_id', {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('qrcode_images', 'equipment_id', {
      type: Sequelize.UUID,
      allowNull: true,
      onDelete: 'SET NULL'
    });
  }
};
