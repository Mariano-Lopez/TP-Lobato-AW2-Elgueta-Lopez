import {Router} from 'express'
import * as controlador from './controlador.productos.mjs'

const rutasProductos = new Router()

// Obtener toda la carta (todos los productos)
rutasProductos.get('/api/v1/productos', controlador.obtenerCarta)

// Obtener todos los productos de una categoria
rutasProductos.get('/api/v1/productos/:categoria', controlador.obtenerTodos)

// Obtener un producto por id, en una categoria
rutasProductos.get('/api/v1/productos/:categoria/:id', controlador.obtenerUno)

// Crear un producto, para una categoria
rutasProductos.post('/api/v1/productos/:categoria', controlador.crearUno)

// Borrar un producto, de una categoria
rutasProductos.delete('/api/v1/productos/:categoria/:id', controlador.borrarUno)

// Actualizar un producto, de una categoria
rutasProductos.put('/api/v1/productos/:categoria/:id', controlador.actualizarUno)

//



export default rutasProductos