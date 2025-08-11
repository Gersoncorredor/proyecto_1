import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/DB.ts';

interface GeneroAttributes {
  id_genero: number;
  nombre: string;
}

interface GeneroCreationAttributes extends Partial<GeneroAttributes> {}

class Genero extends Model<GeneroAttributes, GeneroCreationAttributes> implements GeneroAttributes {
  public id_genero!: number;
  public nombre!: string;
}

Genero.init(
  {
    id_genero: {
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
    tableName: 'generos',
    timestamps: false,
  }
);

export default Genero;