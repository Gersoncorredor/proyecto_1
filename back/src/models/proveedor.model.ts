import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface ProveedorAttributes {
  id_proveedor: number;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
}

interface ProveedorCreationAttributes extends Partial<ProveedorAttributes> {}

class Proveedor extends Model<ProveedorAttributes, ProveedorCreationAttributes> implements ProveedorAttributes {
  public id_proveedor!: number;
  public nombre!: string;
  public direccion!: string;
  public telefono!: string;
  public correo!: string;
}

Proveedor.init(
  {
    id_proveedor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'proveedores',
    timestamps: false,
  }
);

export default Proveedor;