"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Equipment extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: _sequelize2.default.UUID,
                    allowNull: false,
                    defaultValue: _sequelize2.default.UUIDV4,
                    primaryKey: true
                },
                tombo: {
                    type: _sequelize2.default.NUMBER,
                    defaultValue: '',
                    unique: true
                },
                equipamento: {
                    type: _sequelize2.default.STRING,
                    defaultValue: ''
                },
                empresa: {
                    type: _sequelize2.default.STRING,
                    defaultValue: ''
                },
                local: {
                    type: _sequelize2.default.STRING,
                    defaultValue: ''
                },
                responsavel: {
                    type: _sequelize2.default.STRING,
                    defaultValue: ''
                }
            },
            {
                sequelize,
                tableName: 'equipments'
            },
        );

        return this;
    }
} exports.default = Equipment;;