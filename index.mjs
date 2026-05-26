import express from 'express'
//import path from 'path'
import rutasModuloProductos from './modulos/productos/rutas.productos.mjs'

const puerto = 3000

const app = express()

app.use(rutasModuloProductos)

//app.use(express.static(path.resolve('front')))

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})
