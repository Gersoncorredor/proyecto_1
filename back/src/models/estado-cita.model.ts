import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface EstadoCitaAttributes {
  id_estado_cita: number;
  nombre: string;
}

interface EstadoCitaCreationAttributes extends Partial<EstadoCitaAttributes> {}

class EstadoCita extends Model<EstadoCitaAttributes, EstadoCitaCreationAttributes> implements EstadoCitaAttributes {
  public id_estado_cita!: number;
  public nombre!: string;
}

EstadoCita.init(
  {
    id_estado_cita: {
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
    tableName: 'estados_cita',
    timestamps: false,
  }
);

export default EstadoCita;