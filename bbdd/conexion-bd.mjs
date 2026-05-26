import pg from 'pg'

// Clase pool --> Hacer consultas simples

const pool = new pg.Pool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'tienda',
    port: 5432
})

// Exportar para hacerlo visible desde otro modulo
export default pool