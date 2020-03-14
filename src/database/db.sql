CREATE TABLE permisos(
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50),
    nombre VARCHAR(100)
);

INSERT INTO permisos(codigo,nombre) VALUES('ver_usuarios','Ver usuarios');
INSERT INTO permisos(codigo,nombre) VALUES('crear_usuarios','Crear usuarios');
INSERT INTO permisos(codigo,nombre) VALUES('actualizar_usuarios','Actualizar usuarios');
INSERT INTO permisos(codigo,nombre) VALUES('habilitar_usuarios','Habilitar usuarios');
INSERT INTO permisos(codigo,nombre) VALUES('eliminar_usuarios','Eliminar usuarios');

INSERT INTO permisos(codigo,nombre) VALUES('ver_contratos','Ver contratos');
INSERT INTO permisos(codigo,nombre) VALUES('crear_contratos','Crear contratos');
INSERT INTO permisos(codigo,nombre) VALUES('actualizar_contratos','Actualizar contratos');
INSERT INTO permisos(codigo,nombre) VALUES('eliminar_contratos','Eliminar contratos');


CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    contraseña VARCHAR(200) NOT NULL,
    permisos TEXT[],
    habilitado BOOLEAN DEFAULT TRUE
);


INSERT INTO usuarios (nombre,correo,contraseña,permisos) VALUES ('root','root@regcheck.com','$2a$10$JfSWkKOtJty/aeHrRaVkhO90PUp2eZhQYS/KrAfWHAUKxJqnP3pmW',ARRAY ['ver_usuarios','crear_usuarios','actualizar_usuarios','habilitar_usuarios','eliminar_usaurios']);




CREATE TABLE contratos(
    
);