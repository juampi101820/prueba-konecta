-- CREACION DE TABLAS
CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(30) UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL
);

CREATE TABLE usuario_rol (
    id_usuario INTEGER NOT NULL,
    id_rol INTEGER NOT NULL,
    PRIMARY KEY (id_usuario, id_rol),
    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_rol
        FOREIGN KEY (id_rol) REFERENCES rol(id) ON DELETE CASCADE
);

CREATE TABLE empleado (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha_ingreso DATE NOT NULL,
    salario NUMERIC(12,2) NOT NULL
);

-- INSERTS INICIALES
INSERT INTO rol (nombre) VALUES ('EMPLEADO')
INSERT INTO rol (nombre) VALUES ('ADMINISTRADOR')

