import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface TipoProblemaAttributes {
  id_tipo_problema: number;
  nombre: string;
}

interface TipoProblemaCreationAttributes extends Partial<TipoProblemaAttributes> {}

class TipoProblema extends Model<TipoProblemaAttributes, TipoProblemaCreationAttributes> implements TipoProblemaAttributes {
  public id_tipo_problema!: number;
  public nombre!: string;
}

TipoProblema.init(
  {
    id_tipo_problema: {
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
    tableName: 'tipos_problema',
    timestamps: false,
  }
);

export default TipoProblema;