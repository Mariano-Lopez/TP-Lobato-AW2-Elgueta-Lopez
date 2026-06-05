-- Conectar a la base de datos 'carta'
\c carta;

-- Crear la tabla 'productos'
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    precio NUMERIC(10, 2),
    categoria VARCHAR(100),
    imagen VARCHAR(255)
);

-- Insertar 10 productos deportivos
INSERT INTO productos (nombre, precio, categoria, imagen) VALUES
    ('Mozzarella', 11000, 'Pizza', '/front/recursos/imagenes/productos/mozzarella.webp'),
    ('Calabresa', 13000, 'Pizza', '/front/recursos/imagenes/productos/calabresa.webp'),
    ('Napolitana', 14000, 'Pizza', '/front/recursos/imagenes/productos/napolitana.webp'),
    ('Carne', 1250, 'Empanada', '/front/recursos/imagenes/productos/carne.webp'),
    ('Coca Cola 1.5lt', 2500, 'Bebida', '/front/recursos/imagenes/productos/coca-cola.webp'),
    ('Fanta 1.5lt', 2500, 'Bebida', '/front/recursos/imagenes/productos/fanta.webp'),
    ('Sprite 1.5lt', 2500, 'Bebida', '/front/recursos/imagenes/productos/sprite.webp'),
    ('Agua Mineral 500ml', 1500, 'Bebida', '/front/recursos/imagenes/productos/agua-mineral.webp'),
    ('Empanada de Jamón y Queso', 1200, 'Empanada', '/front/recursos/imagenes/productos/jamon-queso.webp'),
    ('Empanada de Pollo', 1200, 'Empanada', '/front/recursos/imagenes/productos/pollo.webp'),
    ('Empanada de Verdura', 1200, 'Empanada', '/front/recursos/imagenes/productos/verdura.webp'),
    ('Empanada de Queso', 1200, 'Empanada', '/front/recursos/imagenes/productos/queso.webp');
