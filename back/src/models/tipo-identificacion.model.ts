import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface TipoIdentificacionAttributes {
  id_tipo_identificacion: number;
  nombre: string;
}

interface TipoIdentificacionCreationAttributes extends Partial<TipoIdentificacionAttributes> {}

class TipoIdentificacion extends Model<TipoIdentificacionAttributes, TipoIdentificacionCreationAttributes> implements TipoIdentificacionAttributes {
  public id_tipo_identificacion!: number;
  public nombre!: string;
}

TipoIdentificacion.init(
  {
    id_tipo_identificacion: {
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
    tableName: 'tipos_identificacion',
    timestamps: false,
  }
);

export default TipoIdentificacion;