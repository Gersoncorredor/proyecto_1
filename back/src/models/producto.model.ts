import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';
import CategoriaProducto from './categoria-producto.model.ts';
import Marca from './marca.model.ts';
import Proveedor from './proveedor.model.ts';

interface ProductoAttributes {
  id_producto: number;
  id_categoria: number;
  id_marca: number;
  id_proveedor: number;
  nombre: string;
  descripcion: string;
  precio_compra: number;
  precio_venta: number;
  stock: number;
  imagen: string | null;
}

interface ProductoCreationAttributes extends Partial<ProductoAttributes> {}

class Producto extends Model<ProductoAttributes, ProductoCreationAttributes> implements ProductoAttributes {
  public id_producto!: number;
  public id_categoria!: number;
  public id_marca!: number;
  public id_proveedor!: number;
  public nombre!: string;
  public descripcion!: string;
  public precio_compra!: number;
  public precio_venta!: number;
  public stock!: number;
  public imagen!: string | null;
}

Producto.init(
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categorias_producto',
        key: 'id_categoria',
      },
    },
    id_marca: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'marcas',
        key: 'id_marca',
      },
    },
    id_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proveedores',
        key: 'id_proveedor',
      },
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precio_compra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    precio_venta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'productos',
    timestamps: false,
  }
);

// Establecer relaciones
Producto.belongsTo(CategoriaProducto, { foreignKey: 'id_categoria' });
Producto.belongsTo(Marca, { foreignKey: 'id_marca' });
Producto.belongsTo(Proveedor, { foreignKey: 'id_proveedor' });

export default Producto;