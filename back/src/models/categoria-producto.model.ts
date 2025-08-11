import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface CategoriaProductoAttributes {
  id_categoria: number;
  nombre: string;
}

interface CategoriaProductoCreationAttributes extends Partial<CategoriaProductoAttributes> {}

class CategoriaProducto extends Model<CategoriaProductoAttributes, CategoriaProductoCreationAttributes> implements CategoriaProductoAttributes {
  public id_categoria!: number;
  public nombre!: string;
}

CategoriaProducto.init(
  {
    id_categoria: {
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
    tableName: 'categorias_producto',
    timestamps: false,
  }
);

export default CategoriaProducto;