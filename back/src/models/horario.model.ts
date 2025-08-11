import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface HorarioAttributes {
  id_horario: number;
  hora_inicio: string;
  hora_fin: string;
}

interface HorarioCreationAttributes extends Partial<HorarioAttributes> {}

class Horario extends Model<HorarioAttributes, HorarioCreationAttributes> implements HorarioAttributes {
  public id_horario!: number;
  public hora_inicio!: string;
  public hora_fin!: string;
}

Horario.init(
  {
    id_horario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'horarios',
    timestamps: false,
  }
);

export default Horario;