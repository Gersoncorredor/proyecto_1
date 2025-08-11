import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface TipoExamenAttributes {
  id_tipo_examen: number;
  nombre: string;
}

interface TipoExamenCreationAttributes extends Partial<TipoExamenAttributes> {}

class TipoExamen extends Model<TipoExamenAttributes, TipoExamenCreationAttributes> implements TipoExamenAttributes {
  public id_tipo_examen!: number;
  public nombre!: string;
}

TipoExamen.init(
  {
    id_tipo_examen: {
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
    tableName: 'tipos_examen',
    timestamps: false,
  }
);

export default TipoExamen;