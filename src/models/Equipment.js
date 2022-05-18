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
                secretaria: {
                    type: Sequelize.STRING,
                    defaultValue: ''
                },
                setor: {
                    type: Sequelize.STRING,
                    defaultValue: ''
                },
                alugado: {
                    type: Sequelize.BOOLEAN,
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
            equipment.secretaria = await equipment.secretaria.toUpperCase();
            equipment.setor = await equipment.setor.toUpperCase();
            equipment.responsavel = await equipment.responsavel.toUpperCase();

            equipment.data_verificacao = await equipment.data_verificacao.split('-').reverse().join('/');
        });

        return this;
    }
};
