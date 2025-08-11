import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';
import User from './user.model.ts';
import TipoProblema from './tipo-problema.model.ts';
import EstadoSoporte from './estado-soporte.model.ts';

interface TicketSoporteAttributes {
  id_ticket: number;
  numero_documento_cliente: string;
  numero_documento_soporte: string | null;
  id_tipo_problema: number;
  id_estado_soporte: number;
  titulo: string;
  descripcion: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date | null;
}

interface TicketSoporteCreationAttributes extends Partial<TicketSoporteAttributes> {}

class TicketSoporte extends Model<TicketSoporteAttributes, TicketSoporteCreationAttributes> implements TicketSoporteAttributes {
  public id_ticket!: number;
  public numero_documento_cliente!: string;
  public numero_documento_soporte!: string | null;
  public id_tipo_problema!: number;
  public id_estado_soporte!: number;
  public titulo!: string;
  public descripcion!: string;
  public fecha_creacion!: Date;
  public fecha_actualizacion!: Date | null;
}

TicketSoporte.init(
  {
    id_ticket: {
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
    numero_documento_soporte: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'numero_documento',
      },
    },
    id_tipo_problema: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipos_problema',
        key: 'id_tipo_problema',
      },
    },
    id_estado_soporte: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estados_soporte',
        key: 'id_estado_soporte',
      },
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tickets_soporte',
    timestamps: false,
  }
);

// Establecer relaciones
TicketSoporte.belongsTo(User, { foreignKey: 'numero_documento_cliente', as: 'Cliente' });
TicketSoporte.belongsTo(User, { foreignKey: 'numero_documento_soporte', as: 'Soporte' });
TicketSoporte.belongsTo(TipoProblema, { foreignKey: 'id_tipo_problema' });
TicketSoporte.belongsTo(EstadoSoporte, { foreignKey: 'id_estado_soporte' });

export default TicketSoporte;