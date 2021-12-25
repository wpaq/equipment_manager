import Sequelize, { Model, DataTypes } from 'sequelize';

export default class Equipment extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true
                },
                tombo: {
                    type: Sequelize.NUMBER,
                    defaultValue: '',
                    unique: true
                },
                equipamento: {
                    type: Sequelize.STRING,
                    defaultValue: ''
                },
                empresa: {
                    type: Sequelize.STRING,
                    defaultValue: ''
                },
                local: {
                    type: Sequelize.STRING,
                    defaultValue: ''
                },
                responsavel: {
                    type: Sequelize.STRING,
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
};
