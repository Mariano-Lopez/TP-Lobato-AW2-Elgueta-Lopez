import * as modelo from './modelo.productos.mjs'

export async function obtenerTodos(req, res){
    // Obtener consulta a BD desde capa modelo
    const respuesta = await modelo.obtenerTodos()

    // La respuesta tiene todos los datos de la consulta
    const respuestaDatos = respuesta.rows
    /*
    respuesta:
        consulta,
        campos,
        datos de la tabla (rows) <-- arreglo
    */

    res.json(respuestaDatos)
}
