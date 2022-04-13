import Sequelize, { Model } from 'sequelize';

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
                },
                configuracao: {
                    type: Sequelize.STRING,
                    defaultValue: ''
                },
                data_verificacao: {
                    type: Sequelize.STRING,
                    defaultValue: ''
                }
            },
            {
                sequelize,
                freezeTableName: true,
                tableName: 'equipments',
            },
        );
        // Uppercase
        this.addHook('beforeSave', async (equipment) => {
            equipment.equipamento = await equipment.equipamento.toUpperCase();
            equipment.empresa = await equipment.empresa.toUpperCase();
            equipment.local = await equipment.local.toUpperCase();
            equipment.responsavel = await equipment.responsavel.toUpperCase();
        });

        return this;
    }
};
