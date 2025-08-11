import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';
import User from './user.model.ts';
import EstadoVenta from './estado-venta.model.ts';

interface VentaAttributes {
  id_venta: number;
  numero_documento_cliente: string;
  numero_documento_vendedor: string;
  id_estado_venta: number;
  fecha: Date;
  total: number;
}

interface VentaCreationAttributes extends Partial<VentaAttributes> {}

class Venta extends Model<VentaAttributes, VentaCreationAttributes> implements VentaAttributes {
  public id_venta!: number;
  public numero_documento_cliente!: string;
  public numero_documento_vendedor!: string;
  public id_estado_venta!: number;
  public fecha!: Date;
  public total!: number;
}

Venta.init(
  {
    id_venta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_documento_cliente: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'numero_documento',
      },
    },
    numero_documento_vendedor: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'numero_documento',
      },
    },
    id_estado_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estados_venta',
        key: 'id_estado_venta',
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'ventas',
    timestamps: false,
  }
);

// Establecer relaciones
Venta.belongsTo(User, { foreignKey: 'numero_documento_cliente', as: 'Cliente' });
Venta.belongsTo(User, { foreignKey: 'numero_documento_vendedor', as: 'Vendedor' });
Venta.belongsTo(EstadoVenta, { foreignKey: 'id_estado_venta' });

export default Venta;