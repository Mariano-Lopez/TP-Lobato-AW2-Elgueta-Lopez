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

export async function obtenerUno(req, res) {
    const id = req.params.id

    const producto = await modelo.obtenerUno(id)

    //const respuesta = 
    console.log('--------------------------------------')
    console.log(producto)
    console.log('--------------------------------------')
    if(producto.length > 0){
        res.json(producto)
    }
    else{
        res.status(404).json({mensaje: 'Producto no encontrado'})
    }


}

export async function crearUno(req, res) {
    
    const {nombre, precio, categoria} = req.body
    const productos = await modelo.crearUno(nombre, precio, categoria)
    console.log(productos)
    res.status(201).json({menaje: "Producto dado de alta", productos: productos.rows})
}