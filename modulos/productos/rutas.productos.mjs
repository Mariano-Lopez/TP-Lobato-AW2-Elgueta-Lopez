import {Router} from 'express'
import * as controlador from './controlador.productos.mjs'

const rutasProductos = new Router()

rutasProductos.get('/api/v1/productos', controlador.obtenerTodos)

rutasProductos.get('/api/v1/productos/:id', controlador.obtenerUno)

rutasProductos.post('/api/v1/productos', controlador.crearUno1)

export default rutasProductos