import pool from '../../bbdd/conexion-bd.mjs'

export async function obtenerTodos(){
    const resultado = await pool.query('SELECT * FROM productos') // devuelve promesa
    
    return resultado
}

export async function obtenerUno(id) {
    
    const idProducto = Number(id)

    const resultado = await pool.query('SELECT * FROM productos WHERE id =$1', [idProducto])

    return resultado.rows
}


export async function crearUno(nom, pre, cat) {

    const resultado = await pool.query('INSERT INTO productos(nombre, precio, categoria) VALUES($1, $2, $3) RETURNING id, nombre, precio, categoria', [nom, pre, cat])

    return resultado.rows
}
















export async function actualizarUno() {
    
}

export async function borrarUno() {
    
}
