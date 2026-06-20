-- Conectar a la base de datos 'carta'
\c admin;

DROP TABLE IF EXISTS carta;
CREATE TABLE carta (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    imagen VARCHAR(255)
);

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO carta (nombre, precio, categoria, imagen) VALUES
    ('Mozzarella', 11000, 'Pizza', '/front-web/recursos/imagenes/productos/Pizza-mozzarella.webp'),
    ('Calabresa', 13000, 'Pizza', '/front-web/recursos/imagenes/productos/Pizza-calabresa.webp'),
    ('Napolitana', 14000, 'Pizza', '/front-web/recursos/imagenes/productos/Pizza-napolitana.webp'),
    ('4 Quesos', 15000, 'Pizza', '/front-web/recursos/imagenes/productos/pizza-4_quesos.webp'),
    ('Mixta', 15000, 'Pizza', '/front-web/recursos/imagenes/productos/Pizza-mixta.webp'),
    ('Carne', 1250, 'Empanada', '/front-web/recursos/imagenes/productos/Empanada-criolla.webp'),
    ('Pollo', 1250, 'Empanada', '/front-web/recursos/imagenes/productos/Empanada-pollo.webp'),
    ('Verdura', 1300, 'Empanada', '/front-web/recursos/imagenes/productos/Empanada-verdura.webp'),
    ('Jamón y Queso', 1350, 'Empanada', '/front-web/recursos/imagenes/productos/Empanada-jyq.webp'),
    ('Coca Cola 1.5lt', 2500, 'Bebida', '/front-web/recursos/imagenes/productos/CocaComun.webp'),
    ('Coca Cola Zero 1.5lt', 2600, 'Bebida', '/front-web/recursos/imagenes/productos/CocaZero.webp'),
    ('Sprite 1.5lt', 2000, 'Bebida', '/front-web/recursos/imagenes/productos/Sprite.webp'),
    ('Fanta 1.5lt', 2000, 'Bebida', '/front-web/recursos/imagenes/productos/Fanta.webp'),
    ('Lata Quilmes 473ml', 2300, 'Bebida', '/front-web/recursos/imagenes/productos/lata-quilmes.webp'),
    ('Schneider 710ml', 2800, 'Bebida', '/front-web/recursos/imagenes/productos/Schneider.webp');

INSERT INTO usuarios (username, password_hash) VALUES
    ('Mariano-Lopez', '$2b$10$UYVXMC5dE0ZOP1Fs2RPTQuvnWqsAbW9vbhixJ8eL7MepEDxnCmuku'),
    ('Facundo-Elgueta', '$2b$10$MmR.kNTWW4aqftH2QvviyeJ7CXH7vAxLFP4xCKB1ZZQqW9Xuj6Lji')
