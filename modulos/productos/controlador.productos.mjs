import * as modelo from './modelo.productos.mjs'
import multer from 'multer'
import path from 'node:path'

// Instanciamos multer
const subirArchivo = multer({
    dest: path.join('archivos')
})

// Configuramos .single
const manejarArchivo = subirArchivo.single('archivo') //<-- Devuelve una funcion


// GET
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

// GET
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

//POST
// export async function crearUno(req, res) {
    
//     const {nombre, precio, categoria} = req.body
//     const productos = await modelo.crearUno(nombre, precio, categoria)
//     console.log(productos)
//     res.status(201).json({mensaje: "Producto dado de alta", productos: productos.rows})
// }

export async function crearUno1(req, res) {
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
            producto: req.body.nombre,
            precio: req.body.precio,
            imagen: req.file.originalname
        }

        const respuesta = await modelo.crearUno1(datos)
        // crearUno(datos)

        res.status(201).json({mensaje: "Registro creado"})
    })

}