import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface RolAttributes {
  id_rol: number;
  nombre: string;
}

interface RolCreationAttributes extends Partial<RolAttributes> {}

class Rol extends Model<RolAttributes, RolCreationAttributes> implements RolAttributes {
  public id_rol!: number;
  public nombre!: string;
}

Rol.init(
  {
    id_rol: {
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
    tableName: 'roles',
    timestamps: false,
  }
);

export default Rol;