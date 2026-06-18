import {Router} from 'express'
import * as controlador from './controlador.productos.mjs'

const rutasProductos = new Router()

// Obtener toda la carta (todos los productos)
rutasProductos.get('/api/v1/productos', controlador.obtenerCarta)

// Obtener todos los productos de una categoria
rutasProductos.get('/api/v1/productos/categoria/:categoria', controlador.obtenerTodos)

// Obtener un producto por id
rutasProductos.get('/api/v1/productos/:id', controlador.obtenerUno)

// Crear un producto
rutasProductos.post('/api/v1/productos', controlador.crearUno)

// Borrar un producto por id
rutasProductos.delete('/api/v1/productos/:id', controlador.borrarUno)

// Actualizar un producto por id
rutasProductos.put('/api/v1/productos/:id', controlador.actualizarUno)

export default rutasProductos