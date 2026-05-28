import express from 'express'
import './iniciar.env.mjs'
//import path from 'path'
import rutasModuloProductos from './modulos/productos/rutas.productos.mjs'

//Variables de entorno 
//Como acceder?
//console.log(process.env.puerto)

//console.log(process.env.BD_PASS)
const puerto = process.env.puerto || 3000

const app = express()
app.use(express.json())
app.use(rutasModuloProductos)

//app.use(express.static(path.resolve('front')))

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})