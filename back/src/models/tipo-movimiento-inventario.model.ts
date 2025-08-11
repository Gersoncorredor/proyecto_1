import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface TipoMovimientoInventarioAttributes {
  id_tipo_movimiento: number;
  nombre: string;
}

interface TipoMovimientoInventarioCreationAttributes extends Partial<TipoMovimientoInventarioAttributes> {}

class TipoMovimientoInventario extends Model<TipoMovimientoInventarioAttributes, TipoMovimientoInventarioCreationAttributes> implements TipoMovimientoInventarioAttributes {
  public id_tipo_movimiento!: number;
  public nombre!: string;
}

TipoMovimientoInventario.init(
  {
    id_tipo_movimiento: {
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
    tableName: 'tipos_movimiento_inventario',
    timestamps: false,
  }
);

export default TipoMovimientoInventario;