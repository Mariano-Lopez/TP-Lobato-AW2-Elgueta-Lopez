-- Conectar a la base de datos 'tienda'
\c tienda;

-- Crear la tabla 'productos'
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    precio NUMERIC(10, 2),
    categoria VARCHAR(100)
);

-- Insertar 10 productos deportivos
INSERT INTO productos (nombre, precio, categoria) VALUES
    ('Mozzarella', 11000, 'Pizza'),
    ('Calabresa', 13000, 'Pizza'),
    ('Carne', 1250, 'Empanada'),
    ('Coca Cola 1.5lt', 2500, 'Bebida')
