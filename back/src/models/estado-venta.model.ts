import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface EstadoVentaAttributes {
  id_estado_venta: number;
  nombre: string;
}

interface EstadoVentaCreationAttributes extends Partial<EstadoVentaAttributes> {}

class EstadoVenta extends Model<EstadoVentaAttributes, EstadoVentaCreationAttributes> implements EstadoVentaAttributes {
  public id_estado_venta!: number;
  public nombre!: string;
}

EstadoVenta.init(
  {
    id_estado_venta: {
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
    tableName: 'estados_venta',
    timestamps: false,
  }
);

export default EstadoVenta;