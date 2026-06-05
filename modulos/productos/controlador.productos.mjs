import * as modelo from './modelo.productos.mjs'
import multer from 'multer'
import path from 'node:path'

// Instanciamos multer
const subirArchivo = multer({
    dest: path.join('archivos')
})

// Configuramos .single
const manejarArchivo = subirArchivo.single('archivo') //<-- Devuelve una funcion

export async function obtenerCarta(req, res){
    const respuesta = await modelo.obtenerCarta()

    res.json(respuesta)
}

// GET
export async function obtenerTodos(req, res){
    // Obtener consulta a BD desde capa modelo
    const respuesta = await modelo.obtenerTodos(req.params.categoria)

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

// GET
export async function obtenerUno(req, res) {
    const id = req.params.id
    const categoria = req.params.categoria

    const producto = await modelo.obtenerUno(id, categoria)

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
    // Manejamos el archivo 
    manejarArchivo(req, res, async (error)=> {
        // Si hay error
        if (error) return res.status(500).json({mensaje: "Error en el servidor"})

        // Insertar a BBDD

        // Obtener los datos del formulario
        // Si no
        console.log(req.file) // <-- nombre de archivo
        console.log(req.body) // <-- demás datos

        const datos = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            categoria: req.body.categoria
            // imagen: req.file.originalname
        }

        const respuesta = await modelo.crearUno(datos, req.body.categoria)
        // crearUno(datos)

        res.status(201).json({mensaje: "Registro creado"})
    })
}

export async function borrarUno(req, res){
    const id = req.params.id
    const categoria = req.params.categoria

    const producto = await modelo.borrarUno(id, categoria)

    if (producto != null){
        res.json({mensaje: 'Producto eliminado correctamente.'})
    }
    else{
        res.status(500).json({mensaje: 'Producto no encontrado.'})
    }
}

export async function actualizarUno(req, res) {
    const id = req.params.id
    const categoria = req.params.categoria

    const producto = await modelo.actualizarUno(id, req.body, categoria)

    if (producto != null){
        res.json({mensaje: 'Producto actualizado correctamente.'})
    }
    else{
        res.status(500).json({mensaje: 'Producto no encontrado.'})
    }

}



