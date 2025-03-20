create database gestionevento;

use gestionevento;

#tablas administrador

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    rol ENUM('admin', 'usuario')
);


CREATE TABLE eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    fecha_hora DATETIME,
    ubicacion VARCHAR(255),
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
);
#que agregue la fecha del sistema
INSERT INTO eventos (nombre, fecha_hora, ubicacion, estado) 
VALUES ('Conferencia Tech', '2025-04-15 14:30:00', 'Centro de Convenciones', 'activo');

select * from eventos;

CREATE TABLE tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    responsable VARCHAR(100),
    estado ENUM('pendiente', 'completada') DEFAULT 'pendiente',
    id_evento INT,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE CASCADE
);

CREATE TABLE presupuesto (
    id_presupuesto INT AUTO_INCREMENT PRIMARY KEY,
    partida VARCHAR(255),
    estimado DECIMAL(10,2) check (estimado >= 0),
    id_evento INT,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE CASCADE
);

#tablas usuarios 

CREATE TABLE confirmaciones (
    id_confirmacion INT AUTO_INCREMENT PRIMARY KEY,
    estado ENUM('confirmado') DEFAULT 'confirmado',
    id_usuario INT,
    id_evento INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE CASCADE,
    UNIQUE(id_usuario, id_evento)
);


CREATE TABLE cotizaciones (
    id_cotizacion INT AUTO_INCREMENT PRIMARY KEY,
    nombre_evento VARCHAR(255),
    detalles TEXT,
    estado ENUM('pendiente', 'aprobado', 'rechazado') DEFAULT 'pendiente',
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

select * from usuarios;
select * from eventos;
select * from tareas;
select * from confirmaciones;
select * from cotizaciones;


delete from usuarios where id_usuario=1;