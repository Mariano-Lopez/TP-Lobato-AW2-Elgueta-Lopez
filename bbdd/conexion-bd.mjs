import pg from 'pg'

// Clase pool --> Hacer consultas simples

const pool = new pg.Pool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_BD,
    port: process.env.BD_PORT
})

// Exportar para hacerlo visible desde otro modulo
export default pool