"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class QRCodeImage extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
            type: _sequelize2.default.UUID,
            allowNull: false,
            defaultValue: _sequelize2.default.UUIDV4,
            primaryKey: true
        },
        photo_data: {
          type: _sequelize2.default.BLOB('long'),
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
} exports.default = QRCodeImage;