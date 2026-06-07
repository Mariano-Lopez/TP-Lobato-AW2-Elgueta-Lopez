-- Conectar a la base de datos 'carta'
\c carta;

-- Crear tablas para Pizza, Empanada y Bebida
CREATE TABLE Pizza (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    precio NUMERIC(10, 2),
    categoria VARCHAR(100),
    imagen VARCHAR(255)
);

CREATE TABLE Empanada (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    precio NUMERIC(10, 2),
    categoria VARCHAR(100),
    imagen VARCHAR(255)
);

CREATE TABLE Bebida (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    precio NUMERIC(10, 2),
    categoria VARCHAR(100),
    imagen VARCHAR(255)
);

-- Insertar datos en las tablas
INSERT INTO Pizza (nombre, precio, categoria, imagen) VALUES
    ('Mozzarella', 11000, 'Pizza', '/front/recursos/imagenes/productos/Pizza-mozzarella.webp'),
    ('Calabresa', 13000, 'Pizza', '/front/recursos/imagenes/productos/Pizza-calabresa.webp'),
    ('Napolitana', 14000, 'Pizza', '/front/recursos/imagenes/productos/Pizza-napolitana.webp'),
    ('4 Quesos', 15000, 'Pizza', '/front/recursos/imagenes/productos/pizza-4_quesos.webp'),
    ('Mixta', 15000, 'Pizza', '/front/recursos/imagenes/productos/Pizza-mixta.webp');

INSERT INTO Empanada (nombre, precio, categoria, imagen) VALUES
    ('Carne', 1250, 'Empanada', '/front/recursos/imagenes/productos/Empanada-criolla.webp'),
    ('Pollo', 1250, 'Empanada', '/front/recursos/imagenes/productos/Empanada-pollo.webp'),
    ('Verdura', 1300, 'Empanada', '/front/recursos/imagenes/productos/Empanada-verdura.webp'),
    ('Jamón y Queso', 1350, 'Empanada', '/front/recursos/imagenes/productos/Empanada-jyq.webp');

INSERT INTO Bebida (nombre, precio, categoria, imagen) VALUES
    ('Coca Cola 1.5lt', 2500, 'Bebida', '/front/recursos/imagenes/productos/CocaComun.webp'),
    ('Coca Cola Zero 1.5lt', 2600, 'Bebida', '/front/recursos/imagenes/productos/CocaZero.webp'),
    ('Sprite 1.5lt', 2000, 'Bebida', '/front/recursos/imagenes/productos/Sprite.webp'),
    ('Fanta 1.5lt', 2000, 'Bebida', '/front/recursos/imagenes/productos/Fanta.webp'),
    ('Lata Quilmes 473ml', 2300, 'Bebida', '/front/recursos/imagenes/productos/lata-quilmes.webp'),
    ('Schneider 710ml', 2800, 'Bebida', '/front/recursos/imagenes/productos/Schneider.webp');