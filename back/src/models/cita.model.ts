import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';
import User from './user.model.ts';
import EstadoCita from './estado-cita.model.ts';
import Horario from './horario.model.ts';

interface CitaAttributes {
  id_cita: number;
  numero_documento: string;
  id_estado_cita: number;
  id_horario: number;
  fecha: Date;
  motivo: string;
}

interface CitaCreationAttributes extends Partial<CitaAttributes> {}

class Cita extends Model<CitaAttributes, CitaCreationAttributes> implements CitaAttributes {
  public id_cita!: number;
  public numero_documento!: string;
  public id_estado_cita!: number;
  public id_horario!: number;
  public fecha!: Date;
  public motivo!: string;
}

Cita.init(
  {
    id_cita: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'numero_documento',
      },
    },
    id_estado_cita: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estados_cita',
        key: 'id_estado_cita',
      },
    },
    id_horario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'horarios',
        key: 'id_horario',
      },
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'citas',
    timestamps: false,
  }
);

// Establecer relaciones
Cita.belongsTo(User, { foreignKey: 'numero_documento' });
Cita.belongsTo(EstadoCita, { foreignKey: 'id_estado_cita' });
Cita.belongsTo(Horario, { foreignKey: 'id_horario' });

export default Cita;