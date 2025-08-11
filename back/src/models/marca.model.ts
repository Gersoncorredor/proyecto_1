import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface MarcaAttributes {
  id_marca: number;
  nombre: string;
}

interface MarcaCreationAttributes extends Partial<MarcaAttributes> {}

class Marca extends Model<MarcaAttributes, MarcaCreationAttributes> implements MarcaAttributes {
  public id_marca!: number;
  public nombre!: string;
}

Marca.init(
  {
    id_marca: {
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
    tableName: 'marcas',
    timestamps: false,
  }
);

export default Marca;