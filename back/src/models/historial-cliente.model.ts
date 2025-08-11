import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';
import User from './user.model.ts';

interface HistorialClienteAttributes {
  id_historial: number;
  numero_documento: string;
  fecha: Date;
  descripcion: string;
}

interface HistorialClienteCreationAttributes extends Partial<HistorialClienteAttributes> {}

class HistorialCliente extends Model<HistorialClienteAttributes, HistorialClienteCreationAttributes> implements HistorialClienteAttributes {
  public id_historial!: number;
  public numero_documento!: string;
  public fecha!: Date;
  public descripcion!: string;
}

HistorialCliente.init(
  {
    id_historial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'numero_documento',
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'historial_clientes',
    timestamps: false,
  }
);

// Establecer relaciones
HistorialCliente.belongsTo(User, { foreignKey: 'numero_documento' });

export default HistorialCliente;