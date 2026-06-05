import pool from '../../bbdd/conexion-bd.mjs'

// GET
export async function obtenerTodos(){
    const resultado = await pool.query('SELECT * FROM productos') // devuelve promesa
    
    return resultado
}

export async function obtenerUno(id) {
    
    const idProducto = Number(id)

    const resultado = await pool.query('SELECT * FROM productos WHERE id =$1', [idProducto])

    return resultado.rows
}

export async function crearUno(datos) {
    const resultado = await pool.query('INSERT INTO productos(nombre, precio, categoria) VALUES($1, $2, $3) RETURNING id, nombre, precio, categoria', [datos.nombre, datos.precio, datos.categoria])
    
    return resultado.rows
}


export async function borrarUno(id) {
    const idProducto = Number(id)

    const resultado = await pool.query('SELECT * FROM productos WHERE id =$1', [idProducto])

    if(resultado.rows.length === 0){
        
        return null
    }
    else{
        await pool.query('DELETE FROM productos WHERE id =$1', [idProducto])
    }

    return resultado.rows
}

export async function actualizarUno(id, datos) {
    const idProducto = Number(id)
    console.log('M - Linea 44' + idProducto)

    const resultado = await pool.query('SELECT * FROM productos WHERE id =$1', [idProducto])
    console.log('M - Linea 47' + resultado)

    if(resultado.rows.length === 0){
        return null
    }
    else{
        await pool.query('UPDATE productos SET nombre=$1, precio=$2, categoria=$3 WHERE id =$4', [datos.nombre, datos.precio, datos.categoria, idProducto])
    }

    return resultado.rows
}