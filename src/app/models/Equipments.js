module.exports = (sequelize, DataTypes) => {
    const Equipments = sequelize.define('Equipments', {
        tombo: { 
            type: DataTypes.INTEGER,
            defaultValue: ''
        },
        equipamento: DataTypes.STRING,
        setor: DataTypes.STRING,
        empresa: DataTypes.STRING,
        observacao: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    });

    return Equipments;
}