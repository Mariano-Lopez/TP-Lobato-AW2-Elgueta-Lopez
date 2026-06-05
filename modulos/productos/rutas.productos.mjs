import {Router} from 'express'
import * as controlador from './controlador.productos.mjs'

const rutasProductos = new Router()

rutasProductos.get('/api/v1/productos', controlador.obtenerTodos)

rutasProductos.get('/api/v1/productos/:id', controlador.obtenerUno)

rutasProductos.post('/api/v1/productos', controlador.crearUno)

rutasProductos.delete('/api/v1/productos/:id', controlador.borrarUno)

rutasProductos.put('/api/v1/productos/:id', controlador.actualizarUno)

export default rutasProductos