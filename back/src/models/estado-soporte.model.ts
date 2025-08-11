import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface EstadoSoporteAttributes {
  id_estado_soporte: number;
  nombre: string;
}

interface EstadoSoporteCreationAttributes extends Partial<EstadoSoporteAttributes> {}

class EstadoSoporte extends Model<EstadoSoporteAttributes, EstadoSoporteCreationAttributes> implements EstadoSoporteAttributes {
  public id_estado_soporte!: number;
  public nombre!: string;
}

EstadoSoporte.init(
  {
    id_estado_soporte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'estados_soporte',
    timestamps: false,
  }
);

export default EstadoSoporte;