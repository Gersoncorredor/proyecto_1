-- Base de datos para Óptica DlyTime - Nomenclatura Estandarizada
CREATE DATABASE IF NOT EXISTS dlytime;
USE dlytime;

-- Configuración de motor de almacenamiento y charset
SET default_storage_engine = InnoDB;
SET NAMES utf8mb4;

-- ========================================
-- TABLAS DE CATÁLOGO (Datos maestros)
-- ========================================

CREATE TABLE tipos_identificacion (
    id_tipo_identificacion INT AUTO_INCREMENT,
    nombre VARCHAR(35) NOT NULL UNIQUE,
    abreviacion VARCHAR(10),
    activo BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_tipo_identificacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE generos (
    id_genero INT AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL UNIQUE,
    activo BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_genero)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE estados_usuario (
    id_estado INT AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL UNIQUE,
    descripcion VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    descripcion VARCHAR(100),
    permisos JSON,
    activo BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TABLA PRINCIPAL DE USUARIOS
-- ========================================

CREATE TABLE usuarios (
    numero_documento BIGINT NOT NULL,
    id_rol INT NOT NULL DEFAULT 1,
    id_tipo_identificacion INT NOT NULL,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    id_genero INT NOT NULL,
    correo VARCHAR(60) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    clave VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    direccion VARCHAR(150),
    id_estado_usuario INT NOT NULL DEFAULT 1,
    
    -- Campos para recuperación de contraseña
    codigo_reset VARCHAR(10),
    expira_reset DATETIME,
    
    -- Control de seguridad
    intentos_fallidos INT DEFAULT 0,
    bloqueado_hasta DATETIME NULL,
    
    -- Auditoria
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (numero_documento),
    FOREIGN KEY (id_tipo_identificacion) REFERENCES tipos_identificacion(id_tipo_identificacion),
    FOREIGN KEY (id_genero) REFERENCES generos(id_genero),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    FOREIGN KEY (id_estado_usuario) REFERENCES estados_usuario(id_estado),
    
    INDEX idx_correo (correo),
    INDEX idx_rol (id_rol),
    INDEX idx_estado (id_estado_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- GESTIÓN DE PRODUCTOS ÓPTICOS
-- ========================================

CREATE TABLE categorias_producto (
    id_categoria INT AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    activo BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE marcas (
    id_marca INT AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    pais_origen VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_marca)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE proveedores (
    id_proveedor INT AUTO_INCREMENT,
    razon_social VARCHAR(100) NOT NULL,
    nit VARCHAR(20) UNIQUE,
    telefono VARCHAR(20),
    correo VARCHAR(100),
    direccion VARCHAR(150),
    contacto_principal VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_proveedor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    id_categoria INT NOT NULL,
    id_marca INT NOT NULL,
    
    -- Precios
    precio_compra DECIMAL(12,2) NOT NULL,
    precio_venta DECIMAL(12,2) NOT NULL,
    margen_ganancia DECIMAL(5,2), -- Porcentaje de ganancia
    
    -- Características específicas para óptica
    material VARCHAR(50), -- Acetato, metal, titanio, etc.
    color VARCHAR(30),
    talla VARCHAR(10), -- S, M, L o medidas específicas
    genero_recomendado ENUM('UNISEX', 'HOMBRE', 'MUJER', 'NIÑO'),
    
    -- Para lentes
    tipo_lente ENUM('MONOFOCAL', 'BIFOCAL', 'PROGRESIVO', 'OCUPACIONAL') NULL,
    material_lente VARCHAR(30), -- Orgánico, policarbonato, cristal, etc.
    tratamientos SET('ANTIREFLEJO', 'FOTOCROMATICO', 'POLARIZADO', 'BLUE_LIGHT') NULL,
    
    -- Inventario
    stock_minimo INT DEFAULT 5,
    stock_actual INT DEFAULT 0,
    
    -- Estado
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_producto),
    FOREIGN KEY (id_categoria) REFERENCES categorias_producto(id_categoria),
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca),
    
    INDEX idx_codigo (codigo),
    INDEX idx_categoria (id_categoria),
    INDEX idx_marca (id_marca),
    INDEX idx_stock (stock_actual),
    INDEX idx_precio (precio_venta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- GESTIÓN DE INVENTARIO
-- ========================================

CREATE TABLE tipos_movimiento_inventario (
    id_tipo_movimiento INT AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    afecta_stock ENUM('SUMA', 'RESTA', 'AJUSTE'),
    descripcion VARCHAR(100),
    PRIMARY KEY (id_tipo_movimiento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE movimientos_inventario (
    id_movimiento INT AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_tipo_movimiento INT NOT NULL,
    cantidad INT NOT NULL,
    stock_anterior INT NOT NULL,
    stock_nuevo INT NOT NULL,
    costo DECIMAL(12,2),
    motivo VARCHAR(200),
    numero_documento_usuario BIGINT NOT NULL,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_movimiento),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_tipo_movimiento) REFERENCES tipos_movimiento_inventario(id_tipo_movimiento),
    FOREIGN KEY (numero_documento_usuario) REFERENCES usuarios(numero_documento),
    
    INDEX idx_producto (id_producto),
    INDEX idx_fecha (fecha_movimiento),
    INDEX idx_tipo (id_tipo_movimiento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- PRESCRIPCIONES Y FÓRMULAS ÓPTICAS
-- ========================================

CREATE TABLE tipos_examen (
    id_tipo_examen INT AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    duracion_estimada INT DEFAULT 30,
    precio DECIMAL(10,2),
    activo BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_tipo_examen)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE prescripciones (
    id_prescripcion INT AUTO_INCREMENT,
    numero_documento_cliente BIGINT NOT NULL,
    numero_documento_optico BIGINT NOT NULL, -- Optómetra o técnico óptico
    
    -- Datos del ojo derecho (OD)
    od_esfera DECIMAL(4,2), -- Dioptrías para miopía/hipermetropía
    od_cilindro DECIMAL(4,2), -- Dioptrías para astigmatismo
    od_eje INT, -- Grados del eje del astigmatismo (0-180)
    od_adicion DECIMAL(4,2), -- Adición para presbicia
    od_prisma DECIMAL(4,2), -- Corrección prismática
    od_base VARCHAR(10), -- Base del prisma
    
    -- Datos del ojo izquierdo (OI)
    oi_esfera DECIMAL(4,2),
    oi_cilindro DECIMAL(4,2),
    oi_eje INT,
    oi_adicion DECIMAL(4,2),
    oi_prisma DECIMAL(4,2),
    oi_base VARCHAR(10),
    
    -- Medidas adicionales
    distancia_pupilar DECIMAL(4,1), -- Distancia pupilar en mm
    altura_segmento DECIMAL(4,1), -- Para bifocales/progresivos
    
    -- Información adicional
    observaciones TEXT,
    recomendaciones TEXT,
    vigencia_hasta DATE, -- Hasta cuándo es válida la prescripción
    
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_prescripcion),
    FOREIGN KEY (numero_documento_cliente) REFERENCES usuarios(numero_documento),
    FOREIGN KEY (numero_documento_optico) REFERENCES usuarios(numero_documento),
    
    INDEX idx_cliente (numero_documento_cliente),
    INDEX idx_optico (numero_documento_optico),
    INDEX idx_fecha (fecha_creacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- SISTEMA DE CITAS
-- ========================================

CREATE TABLE estados_cita (
    id_estado_cita INT AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    descripcion VARCHAR(100),
    permite_modificacion BOOLEAN DEFAULT TRUE,
    es_estado_final BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id_estado_cita)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE horarios (
    id_horario INT AUTO_INCREMENT,
    numero_documento_optico BIGINT NOT NULL, -- Optómetra o técnico
    fecha_hora DATETIME NOT NULL,
    duracion_minutos INT DEFAULT 30,
    disponible BOOLEAN DEFAULT TRUE,
    notas VARCHAR(200),
    
    PRIMARY KEY (id_horario),
    FOREIGN KEY (numero_documento_optico) REFERENCES usuarios(numero_documento),
    
    UNIQUE KEY uk_optico_fechahora (numero_documento_optico, fecha_hora),
    INDEX idx_fechahora (fecha_hora),
    INDEX idx_optico (numero_documento_optico)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE citas (
    id_cita INT AUTO_INCREMENT,
    numero_documento_cliente BIGINT NOT NULL,
    numero_documento_optico BIGINT NOT NULL,
    id_tipo_examen INT NOT NULL,
    id_horario INT NOT NULL,
    id_estado_cita INT NOT NULL DEFAULT 1,
    
    motivo_consulta TEXT,
    observaciones TEXT,
    costo_examen DECIMAL(10,2),
    pagado BOOLEAN DEFAULT FALSE,
    
    -- Resultado de la cita
    id_prescripcion INT NULL, -- Se asigna después del examen
    
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_cita),
    FOREIGN KEY (numero_documento_cliente) REFERENCES usuarios(numero_documento),
    FOREIGN KEY (numero_documento_optico) REFERENCES usuarios(numero_documento),
    FOREIGN KEY (id_tipo_examen) REFERENCES tipos_examen(id_tipo_examen),
    FOREIGN KEY (id_horario) REFERENCES horarios(id_horario),
    FOREIGN KEY (id_estado_cita) REFERENCES estados_cita(id_estado_cita),
    FOREIGN KEY (id_prescripcion) REFERENCES prescripciones(id_prescripcion),
    
    UNIQUE KEY uk_horario (id_horario),
    INDEX idx_cliente (numero_documento_cliente),
    INDEX idx_optico (numero_documento_optico),
    INDEX idx_estado (id_estado_cita)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- SISTEMA DE VENTAS
-- ========================================

CREATE TABLE estados_venta (
    id_estado_venta INT AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    descripcion VARCHAR(100),
    PRIMARY KEY (id_estado_venta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT,
    numero_factura VARCHAR(20) UNIQUE,
    numero_documento_cliente BIGINT NOT NULL,
    numero_documento_vendedor BIGINT NOT NULL,
    id_prescripcion INT NULL, -- Si la venta incluye lentes con prescripción
    
    subtotal DECIMAL(12,2) NOT NULL,
    descuento DECIMAL(12,2) DEFAULT 0,
    impuestos DECIMAL(12,2) DEFAULT 0,
    total DECIMAL(12,2) NOT NULL,
    
    metodo_pago ENUM('EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'CREDITO') NOT NULL,
    id_estado_venta INT NOT NULL DEFAULT 1,
    
    -- Entrega
    fecha_estimada_entrega DATE,
    fecha_entrega DATE NULL,
    direccion_entrega VARCHAR(150),
    
    observaciones TEXT,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_venta),
    FOREIGN KEY (numero_documento_cliente) REFERENCES usuarios(numero_documento),
    FOREIGN KEY (numero_documento_vendedor) REFERENCES usuarios(numero_documento),
    FOREIGN KEY (id_prescripcion) REFERENCES prescripciones(id_prescripcion),
    FOREIGN KEY (id_estado_venta) REFERENCES estados_venta(id_estado_venta),
    
    INDEX idx_cliente (numero_documento_cliente),
    INDEX idx_vendedor (numero_documento_vendedor),
    INDEX idx_fecha (fecha_venta),
    INDEX idx_estado (id_estado_venta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE detalles_venta (
    id_detalle_venta INT AUTO_INCREMENT,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    descuento_unitario DECIMAL(12,2) DEFAULT 0,
    subtotal DECIMAL(12,2) NOT NULL,
    
    -- Para lentes personalizados
    especificaciones_especiales TEXT, -- Detalles específicos del producto personalizado
    
    PRIMARY KEY (id_detalle_venta),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    
    INDEX idx_venta (id_venta),
    INDEX idx_producto (id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- SISTEMA DE SOPORTE
-- ========================================

CREATE TABLE tipos_problema (
    id_tipo_problema INT AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    prioridad ENUM('BAJA', 'MEDIA', 'ALTA', 'CRITICA') DEFAULT 'MEDIA',
    activo BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_tipo_problema)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE estados_soporte (
    id_estado_soporte INT AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    descripcion VARCHAR(100),
    es_estado_final BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id_estado_soporte)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE tickets_soporte (
    id_soporte INT AUTO_INCREMENT,
    id_tipo_problema INT NOT NULL,
    numero_documento BIGINT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion_problema TEXT NOT NULL,
    id_estado_soporte INT NOT NULL DEFAULT 1,
    prioridad ENUM('BAJA', 'MEDIA', 'ALTA', 'CRITICA') DEFAULT 'MEDIA',
    
    asignado_a BIGINT NULL,
    
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fecha_cierre DATETIME NULL,
    
    PRIMARY KEY (id_soporte),
    FOREIGN KEY (id_tipo_problema) REFERENCES tipos_problema(id_tipo_problema),
    FOREIGN KEY (numero_documento) REFERENCES usuarios(numero_documento),
    FOREIGN KEY (id_estado_soporte) REFERENCES estados_soporte(id_estado_soporte),
    FOREIGN KEY (asignado_a) REFERENCES usuarios(numero_documento),
    
    INDEX idx_estado (id_estado_soporte),
    INDEX idx_prioridad (prioridad),
    INDEX idx_asignado (asignado_a)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- HISTORIAL DE CLIENTES
-- ========================================

CREATE TABLE historial_clientes (
    id_historial INT AUTO_INCREMENT,
    numero_documento BIGINT NOT NULL,
    tipo ENUM('EXAMEN', 'VENTA', 'REPARACION', 'GARANTIA', 'DEVOLUCION', 'OTRO'),
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    archivo_pdf VARCHAR(500),
    id_venta_relacionada INT NULL,
    id_cita_relacionada INT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado_por BIGINT,
    
    PRIMARY KEY (id_historial),
    FOREIGN KEY (numero_documento) REFERENCES usuarios(numero_documento) ON DELETE CASCADE,
    FOREIGN KEY (creado_por) REFERENCES usuarios(numero_documento),
    FOREIGN KEY (id_venta_relacionada) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_cita_relacionada) REFERENCES citas(id_cita),
    
    INDEX idx_documento_fecha (numero_documento, fecha),
    INDEX idx_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- DATOS BÁSICOS INICIALES
-- ========================================

-- Tipos de identificación
INSERT INTO tipos_identificacion (nombre, abreviacion) VALUES 
('Cédula de Ciudadanía', 'CC'),
('Tarjeta de Identidad', 'TI'),
('Cédula de Extranjería', 'CE'),
('Pasaporte', 'PA'),
('Registro Civil', 'RC');

-- Géneros
INSERT INTO generos (nombre) VALUES 
('Masculino'),
('Femenino'),
('Otro'),
('Prefiero no decir');

-- Estados de usuario
INSERT INTO estados_usuario (nombre, descripcion) VALUES 
('Activo', 'Usuario activo en el sistema'),
('Inactivo', 'Usuario temporalmente inactivo'),
('Bloqueado', 'Usuario bloqueado por motivos de seguridad'),
('Pendiente', 'Usuario pendiente de verificación');

-- Roles específicos para óptica
INSERT INTO roles (nombre, descripcion) VALUES 
('Administrador', 'Acceso completo al sistema'),
('Optómetra', 'Profesional en optometría'),
('Vendedor', 'Personal de ventas'),
('Cliente', 'Cliente de la óptica'),
('Técnico Óptico', 'Técnico especializado en montaje'),
('Soporte', 'Personal de soporte técnico');

-- Categorías de productos
INSERT INTO categorias_producto (nombre, descripcion) VALUES 
('Monturas', 'Marcos para gafas'),
('Lentes', 'Cristales y lentes correctivos'),
('Gafas de Sol', 'Gafas de protección solar'),
('Lentes de Contacto', 'Lentes de contacto blandos y rígidos'),
('Accesorios', 'Estuches, cordones, limpiadores'),
('Líquidos', 'Soluciones para lentes de contacto'),
('Herramientas', 'Herramientas para ajuste y reparación');

-- Marcas populares
INSERT INTO marcas (nombre, descripcion, pais_origen) VALUES 
('Ray-Ban', 'Marca icónica de gafas', 'Italia'),
('Oakley', 'Gafas deportivas y de alta gama', 'Estados Unidos'),
('Transitions', 'Especialista en lentes fotocromáticos', 'Estados Unidos'),
('Essilor', 'Líder mundial en lentes oftálmicos', 'Francia'),
('Zeiss', 'Tecnología alemana en óptica', 'Alemania'),
('Local Brand', 'Marca local', 'Colombia');

-- Estados de cita
INSERT INTO estados_cita (nombre, descripcion, permite_modificacion, es_estado_final) VALUES 
('Programada', 'Cita programada', TRUE, FALSE),
('Confirmada', 'Cita confirmada', TRUE, FALSE),
('En curso', 'Examen en progreso', FALSE, FALSE),
('Completada', 'Examen completado', FALSE, TRUE),
('Cancelada', 'Cita cancelada', FALSE, TRUE),
('No asistió', 'Cliente no asistió', FALSE, TRUE);

-- Tipos de examen
INSERT INTO tipos_examen (nombre, descripcion, duracion_estimada, precio) VALUES 
('Examen Visual Básico', 'Evaluación básica de la visión', 30, 35000.00),
('Examen Visual Completo', 'Evaluación completa con refracción', 45, 55000.00),
('Control de Lentes de Contacto', 'Seguimiento para usuarios de LC', 20, 25000.00),
('Examen Pediátrico', 'Examen especializado para niños', 40, 45000.00);

-- Estados de venta
INSERT INTO estados_venta (nombre, descripcion) VALUES 
('Pendiente', 'Venta registrada, pendiente de pago'),
('Pagada', 'Venta pagada, en proceso'),
('En producción', 'Lentes en proceso de elaboración'),
('Lista para entrega', 'Productos listos para recoger'),
('Entregada', 'Venta completada y entregada'),
('Cancelada', 'Venta cancelada'),
('Devuelta', 'Productos devueltos');

-- Tipos de movimiento de inventario
INSERT INTO tipos_movimiento_inventario (nombre, afecta_stock, descripcion) VALUES 
('Compra', 'SUMA', 'Ingreso de productos por compra'),
('Venta', 'RESTA', 'Salida por venta'),
('Devolución Cliente', 'SUMA', 'Regreso de producto por cliente'),
('Devolución Proveedor', 'RESTA', 'Devolución a proveedor'),
('Ajuste Inventario', 'AJUSTE', 'Corrección de inventario'),
('Producto Dañado', 'RESTA', 'Baja por daño'),
('Muestra', 'RESTA', 'Producto usado como muestra');

-- Estados y tipos de soporte
INSERT INTO estados_soporte (nombre, descripcion, es_estado_final) VALUES 
('Abierto', 'Ticket abierto', FALSE),
('En progreso', 'Siendo atendido', FALSE),
('Esperando respuesta', 'Esperando al cliente', FALSE),
('Resuelto', 'Problema resuelto', TRUE),
('Cerrado', 'Ticket cerrado', TRUE);

INSERT INTO tipos_problema (nombre, descripcion, prioridad) VALUES 
('Problema con producto', 'Defectos o problemas con productos', 'ALTA'),
('Ajuste de gafas', 'Solicitud de ajuste', 'MEDIA'),
('Garantía', 'Reclamos de garantía', 'ALTA'),
('Consulta general', 'Información general', 'BAJA'),
('Problema técnico', 'Fallas del sistema', 'CRITICA');