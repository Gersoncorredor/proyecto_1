import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';
import User from './user.model.ts';
import TipoExamen from './tipo-examen.model.ts';

interface PrescripcionAttributes {
  id_prescripcion: number;
  numero_documento: string;
  id_tipo_examen: number;
  esfera_od: string;
  cilindro_od: string;
  eje_od: string;
  adicion_od: string;
  esfera_oi: string;
  cilindro_oi: string;
  eje_oi: string;
  adicion_oi: string;
  fecha: Date;
  observaciones: string | null;
}

interface PrescripcionCreationAttributes extends Partial<PrescripcionAttributes> {}

class Prescripcion extends Model<PrescripcionAttributes, PrescripcionCreationAttributes> implements PrescripcionAttributes {
  public id_prescripcion!: number;
  public numero_documento!: string;
  public id_tipo_examen!: number;
  public esfera_od!: string;
  public cilindro_od!: string;
  public eje_od!: string;
  public adicion_od!: string;
  public esfera_oi!: string;
  public cilindro_oi!: string;
  public eje_oi!: string;
  public adicion_oi!: string;
  public fecha!: Date;
  public observaciones!: string | null;
}

Prescripcion.init(
  {
    id_prescripcion: {
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
    id_tipo_examen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipos_examen',
        key: 'id_tipo_examen',
      },
    },
    esfera_od: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    cilindro_od: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    eje_od: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    adicion_od: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    esfera_oi: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    cilindro_oi: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    eje_oi: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    adicion_oi: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'prescripciones',
    timestamps: false,
  }
);

// Establecer relaciones
Prescripcion.belongsTo(User, { foreignKey: 'numero_documento' });
Prescripcion.belongsTo(TipoExamen, { foreignKey: 'id_tipo_examen' });

export default Prescripcion;