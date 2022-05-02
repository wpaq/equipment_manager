"use strict";module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('qrcode_images', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        equipment_id: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'equipments',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
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
  
    down: (queryInterface) => queryInterface.dropTable('qrcode_images'),
  };