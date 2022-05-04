import Sequelize, { Model } from 'sequelize';

export default class QRCodeImage extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        photo_data: {
          type: Sequelize.BLOB('long'),
          defaultValue: '',
        },
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'qrcode_images',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Equipment, { foreignKey: 'equipment_id' });
  }
}