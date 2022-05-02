import Sequelize, { Model, VIRTUAL } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        filename: {
          type: Sequelize.STRING,
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
}