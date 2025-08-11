import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface EstadoUsuarioAttributes {
  id_estado_persona: number;
  nombre: string;
}

interface EstadoUsuarioCreationAttributes extends Partial<EstadoUsuarioAttributes> {}

class EstadoUsuario extends Model<EstadoUsuarioAttributes, EstadoUsuarioCreationAttributes> implements EstadoUsuarioAttributes {
  public id_estado_persona!: number;
  public nombre!: string;
}

EstadoUsuario.init(
  {
    id_estado_persona: {
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
    tableName: 'estados_usuario',
    timestamps: false,
  }
);

export default EstadoUsuario;