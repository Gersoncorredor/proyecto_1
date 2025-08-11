import User from './user.model.ts';
import TipoIdentificacion from './tipo-identificacion.model.ts';
import Genero from './genero.model.ts';
import EstadoUsuario from './estado-usuario.model.ts';
import Rol from './rol.model.ts';
import CategoriaProducto from './categoria-producto.model.ts';
import Marca from './marca.model.ts';
import Proveedor from './proveedor.model.ts';
import Producto from './producto.model.ts';
import TipoMovimientoInventario from './tipo-movimiento-inventario.model.ts';
import MovimientoInventario from './movimiento-inventario.model.ts';
import TipoExamen from './tipo-examen.model.ts';
import Prescripcion from './prescripcion.model.ts';
import EstadoCita from './estado-cita.model.ts';
import Horario from './horario.model.ts';
import Cita from './cita.model.ts';
import EstadoVenta from './estado-venta.model.ts';
import Venta from './venta.model.ts';
import DetalleVenta from './detalle-venta.model.ts';
import TipoProblema from './tipo-problema.model.ts';
import EstadoSoporte from './estado-soporte.model.ts';
import TicketSoporte from './ticket-soporte.model.ts';
import HistorialCliente from './historial-cliente.model.ts';

// Establecer asociaciones

// Asociaciones de User
User.belongsTo(TipoIdentificacion, { foreignKey: 'id_tipo_identificacion' });
User.belongsTo(Genero, { foreignKey: 'id_genero' });
User.belongsTo(Rol, { foreignKey: 'id_rol' });
User.belongsTo(EstadoUsuario, { foreignKey: 'id_estado_persona' });

// Asociaciones de Producto
Producto.belongsTo(CategoriaProducto, { foreignKey: 'id_categoria' });
Producto.belongsTo(Marca, { foreignKey: 'id_marca' });
Producto.belongsTo(Proveedor, { foreignKey: 'id_proveedor' });

// Asociaciones de MovimientoInventario
MovimientoInventario.belongsTo(Producto, { foreignKey: 'id_producto' });
MovimientoInventario.belongsTo(TipoMovimientoInventario, { foreignKey: 'id_tipo_movimiento' });
MovimientoInventario.belongsTo(User, { foreignKey: 'numero_documento' });

// Asociaciones de Prescripcion
Prescripcion.belongsTo(User, { foreignKey: 'numero_documento' });
Prescripcion.belongsTo(TipoExamen, { foreignKey: 'id_tipo_examen' });

// Asociaciones de Cita
Cita.belongsTo(User, { foreignKey: 'numero_documento' });
Cita.belongsTo(EstadoCita, { foreignKey: 'id_estado_cita' });
Cita.belongsTo(Horario, { foreignKey: 'id_horario' });

// Asociaciones de Venta
Venta.belongsTo(User, { foreignKey: 'numero_documento_cliente', as: 'Cliente' });
Venta.belongsTo(User, { foreignKey: 'numero_documento_vendedor', as: 'Vendedor' });
Venta.belongsTo(EstadoVenta, { foreignKey: 'id_estado_venta' });

// Asociaciones de DetalleVenta
DetalleVenta.belongsTo(Venta, { foreignKey: 'id_venta' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'id_producto' });

// Asociaciones de TicketSoporte
TicketSoporte.belongsTo(User, { foreignKey: 'numero_documento_cliente', as: 'Cliente' });
TicketSoporte.belongsTo(User, { foreignKey: 'numero_documento_soporte', as: 'Soporte' });
TicketSoporte.belongsTo(TipoProblema, { foreignKey: 'id_tipo_problema' });
TicketSoporte.belongsTo(EstadoSoporte, { foreignKey: 'id_estado_soporte' });

// Asociaciones de HistorialCliente
HistorialCliente.belongsTo(User, { foreignKey: 'numero_documento' });

export {
  User,
  TipoIdentificacion,
  Genero,
  EstadoUsuario,
  Rol,
  CategoriaProducto,
  Marca,
  Proveedor,
  Producto,
  TipoMovimientoInventario,
  MovimientoInventario,
  TipoExamen,
  Prescripcion,
  EstadoCita,
  Horario,
  Cita,
  EstadoVenta,
  Venta,
  DetalleVenta,
  TipoProblema,
  EstadoSoporte,
  TicketSoporte,
  HistorialCliente
};