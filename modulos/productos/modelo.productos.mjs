import pool from '../../bbdd/conexion-bd.mjs'

export async function obtenerTodos(){
    const resultado = await pool.query('SELECT * FROM productos') // devuelve promesa
    
    return resultado
}