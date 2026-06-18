import pool from '../../bbdd/conexion-bd.mjs'

const categoriasValidas = new Set(['Pizza', 'Empanada', 'Bebida'])

function validarCategoria(categoria) {
    if (!categoriasValidas.has(categoria)) {
        throw new Error('Categoría inválida')
    }
}

export async function obtenerCarta(){
    const resultado = await pool.query('SELECT * FROM carta ORDER BY precio DESC')
    return resultado.rows
}

export async function obtenerTodos(categoria){
    validarCategoria(categoria)
    const resultado = await pool.query('SELECT * FROM carta WHERE categoria = $1 ORDER BY precio DESC', [categoria])
    return resultado
}

export async function obtenerUno(id) {
    const idProducto = Number(id)
    const resultado = await pool.query('SELECT * FROM carta WHERE id = $1', [idProducto])
    return resultado.rows
}

export async function crearUno(datos) {
    validarCategoria(datos.categoria)
    const resultado = await pool.query(
        'INSERT INTO carta (nombre, precio, categoria, imagen) VALUES ($1, $2, $3, $4) RETURNING *',
        [datos.nombre, datos.precio, datos.categoria, datos.imagen]
    )
    return resultado.rows[0]
}

export async function borrarUno(id) {
    const idProducto = Number(id)
    const resultado = await pool.query('DELETE FROM carta WHERE id = $1 RETURNING *', [idProducto])
    return resultado.rows[0] ?? null
}

export async function actualizarUno(id, datos) {
    const idProducto = Number(id)
    const resultado = await pool.query('SELECT * FROM carta WHERE id = $1', [idProducto])

    if (resultado.rows.length === 0) {
        return null
    }

    const actual = resultado.rows[0]
    const nombre = datos.nombre ?? actual.nombre
    const precio = datos.precio !== undefined ? datos.precio : actual.precio
    const categoria = datos.categoria ?? actual.categoria
    const imagen = datos.imagen !== undefined ? datos.imagen : actual.imagen

    validarCategoria(categoria)

    const actualizacion = await pool.query(
        'UPDATE carta SET nombre = $1, precio = $2, categoria = $3, imagen = $4 WHERE id = $5 RETURNING *',
        [nombre, precio, categoria, imagen, idProducto]
    )

    return actualizacion.rows[0]
}