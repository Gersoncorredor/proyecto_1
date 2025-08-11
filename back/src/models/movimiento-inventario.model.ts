import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';
import Producto from './producto.model.ts';
import TipoMovimientoInventario from './tipo-movimiento-inventario.model.ts';
import User from './user.model.ts';

interface MovimientoInventarioAttributes {
  id_movimiento: number;
  id_producto: number;
  id_tipo_movimiento: number;
  cantidad: number;
  fecha: Date;
  numero_documento: string;
}

interface MovimientoInventarioCreationAttributes extends Partial<MovimientoInventarioAttributes> {}

class MovimientoInventario extends Model<MovimientoInventarioAttributes, MovimientoInventarioCreationAttributes> implements MovimientoInventarioAttributes {
  public id_movimiento!: number;
  public id_producto!: number;
  public id_tipo_movimiento!: number;
  public cantidad!: number;
  public fecha!: Date;
  public numero_documento!: string;
}

MovimientoInventario.init(
  {
    id_movimiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id_producto',
      },
    },
    id_tipo_movimiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipos_movimiento_inventario',
        key: 'id_tipo_movimiento',
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    numero_documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'numero_documento',
      },
    },
  },
  {
    sequelize,
    tableName: 'movimientos_inventario',
    timestamps: false,
  }
);

// Establecer relaciones
MovimientoInventario.belongsTo(Producto, { foreignKey: 'id_producto' });
MovimientoInventario.belongsTo(TipoMovimientoInventario, { foreignKey: 'id_tipo_movimiento' });
MovimientoInventario.belongsTo(User, { foreignKey: 'numero_documento' });

export default MovimientoInventario;