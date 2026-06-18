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

export async function obtenerTodos(req, res){
    const categoria = req.params.categoria
    try {
        const respuesta = await modelo.obtenerTodos(categoria)
        res.json(respuesta.rows)
    } catch (error) {
        res.status(400).json({mensaje: error.message})
    }
}

export async function obtenerUno(req, res) {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        return res.status(400).json({mensaje: 'Id inválido'})
    }

    const producto = await modelo.obtenerUno(id)

    if(producto.length > 0){
        res.json(producto[0])
    }
    else{
        res.status(404).json({mensaje: 'Producto no encontrado'})
    }
}

export async function crearUno(req, res) {
    manejarArchivo(req, res, async (error)=> {
        if (error) return res.status(500).json({mensaje: 'Error en el servidor'})

        const datos = {
            nombre: req.body.nombre,
            precio: Number(req.body.precio),
            categoria: req.body.categoria,
            imagen: req.file ? req.file.path : null
        }

        try {
            const producto = await modelo.crearUno(datos)
            res.status(201).json({mensaje: 'Registro creado', producto})
        } catch (err) {
            res.status(400).json({mensaje: err.message})
        }
    })
}

export async function borrarUno(req, res){
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        return res.status(400).json({mensaje: 'Id inválido'})
    }

    const producto = await modelo.borrarUno(id)

    if (producto != null){
        res.json({mensaje: 'Producto eliminado correctamente.'})
    }
    else{
        res.status(404).json({mensaje: 'Producto no encontrado.'})
    }
}

export async function actualizarUno(req, res) {
    manejarArchivo(req, res, async (error)=> {
        if (error) return res.status(500).json({mensaje: 'Error en el servidor'})

        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            return res.status(400).json({mensaje: 'Id inválido'})
        }

        const datos = {
            nombre: req.body.nombre,
            precio: req.body.precio !== undefined && req.body.precio !== '' ? Number(req.body.precio) : undefined,
            categoria: req.body.categoria,
            imagen: req.file ? req.file.path : undefined
        }

        try {
            const producto = await modelo.actualizarUno(id, datos)
            if (producto != null){
                return res.json({mensaje: 'Producto actualizado correctamente.', producto})
            }
            else{
                return res.status(404).json({mensaje: 'Producto no encontrado.'})
            }
        } catch (err) {
            return res.status(400).json({mensaje: err.message})
        }
    })



}



