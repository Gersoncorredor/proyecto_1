import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';
import Venta from './venta.model.ts';
import Producto from './producto.model.ts';

interface DetalleVentaAttributes {
  id_detalle: number;
  id_venta: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

interface DetalleVentaCreationAttributes extends Partial<DetalleVentaAttributes> {}

class DetalleVenta extends Model<DetalleVentaAttributes, DetalleVentaCreationAttributes> implements DetalleVentaAttributes {
  public id_detalle!: number;
  public id_venta!: number;
  public id_producto!: number;
  public cantidad!: number;
  public precio_unitario!: number;
  public subtotal!: number;
}

DetalleVenta.init(
  {
    id_detalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ventas',
        key: 'id_venta',
      },
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id_producto',
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'detalles_venta',
    timestamps: false,
  }
);

// Establecer relaciones
DetalleVenta.belongsTo(Venta, { foreignKey: 'id_venta' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'id_producto' });

export default DetalleVenta;