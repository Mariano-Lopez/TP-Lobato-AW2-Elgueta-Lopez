import {Router} from 'express'
import * as controlador from './controlador.productos.mjs'

const rutasProductos = new Router()

// Obtener toda la carta (todos los productos)
rutasProductos.get('/api/v1/productos', controlador.obtenerCarta)

// Obtener todos los productos de una categoria
rutasProductos.get('/api/v1/productos/categoria/:categoria', controlador.obtenerTodos)

// Obtener un producto por id
rutasProductos.get('/api/v1/productos/:id', controlador.obtenerUno)

// Mantener compatibilidad con la ruta antigua de producto por categoria e id
rutasProductos.get('/api/v1/productos/:categoria/:id', controlador.obtenerUno)

// Crear un producto
rutasProductos.post('/api/v1/productos', controlador.crearUno)

// Borrar un producto por id
rutasProductos.delete('/api/v1/productos/:id', controlador.borrarUno)

// Actualizar un producto por id
rutasProductos.put('/api/v1/productos/:id', controlador.actualizarUno)

// Mantener compatibilidad con la ruta antigua de actualización por categoria e id
rutasProductos.put('/api/v1/productos/:categoria/:id', controlador.actualizarUno)

// Mantener compatibilidad con la ruta antigua de borrado por categoria e id
rutasProductos.delete('/api/v1/productos/:categoria/:id', controlador.borrarUno)


export default rutasProductos