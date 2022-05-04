'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('qrcode_images', 'photo_data', {
      type: Sequelize.BLOB('long'),
      allowNull: false,
    });
    await queryInterface.removeColumn('qrcode_images', 'filename');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('qrcode_images', 'photo_data');
    await queryInterface.addColumn('qrcode_images', 'filename', {
        type: Sequelize.STRING,
        allowNull: false,
    });
  }
};
