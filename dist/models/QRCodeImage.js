"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Photo extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
            type: _sequelize2.default.UUID,
            allowNull: false,
            defaultValue: _sequelize2.default.UUIDV4,
            primaryKey: true
        },
        filename: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Equipment, { foreignKey: 'equipment_id' });
  }
} exports.default = Photo;