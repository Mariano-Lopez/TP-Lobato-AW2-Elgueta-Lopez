import pool from '../../bbdd/conexion-bd.mjs'

export async function obtenerCarta(){
    const resultado = await pool.query(`
        SELECT id, nombre, precio, categoria, 'Pizza' as origen FROM Pizza
        UNION ALL
        SELECT id, nombre, precio, categoria, 'Empanada' as origen FROM Empanada
        UNION ALL
        SELECT id, nombre, precio, categoria, 'Bebida' as origen FROM Bebida
        ORDER BY precio DESC
    `)

    return resultado.rows
}

// GET
export async function obtenerTodos(categoria){
    const resultado = await pool.query(`SELECT * FROM ${categoria}`) // devuelve promesa
    
    return resultado
}

export async function obtenerUno(id, categoria) {
    
    const idProducto = Number(id)

    const resultado = await pool.query(`SELECT * FROM ${categoria} WHERE id =$1`, [idProducto])

    return resultado.rows
}

export async function crearUno(datos, categoria) {
    const resultado = await pool.query(`INSERT INTO ${categoria}(nombre, precio, categoria) VALUES($1, $2, $3) RETURNING id, nombre, precio, categoria`, [datos.nombre, datos.precio, datos.categoria])

    return resultado.rows
}


export async function borrarUno(id, categoria) {
    const idProducto = Number(id)

    const resultado = await pool.query(`SELECT * FROM ${categoria} WHERE id =$1`, [idProducto])

    if(resultado.rows.length === 0){
        
        return null
    }
    else{
        await pool.query(`DELETE FROM ${categoria} WHERE id =$1`, [idProducto])
    }

    return resultado.rows
}

export async function actualizarUno(id, datos, categoria) {
    const idProducto = Number(id)
    console.log('M - Linea 44' + idProducto)

    const resultado = await pool.query(`SELECT * FROM ${categoria} WHERE id =$1`, [idProducto])
    console.log('M - Linea 47' + resultado)

    if(resultado.rows.length === 0){
        return null
    }
    else{
        await pool.query(`UPDATE ${categoria} SET nombre=$1, precio=$2, categoria=$3 WHERE id =$4`, [datos.nombre, datos.precio, datos.categoria, idProducto])
    }

    return resultado.rows
}