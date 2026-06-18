import express from 'express'
import path from 'node:path'
import './iniciar.env.mjs'
import rutasModuloProductos from './modulos/productos/rutas.productos.mjs'

//Variables de entorno 
//Como acceder?
//console.log(process.env.puerto)

//console.log(process.env.BD_PASS)
const puerto = process.env.puerto || 3000

const app = express()

// Agregar estos middlewares ANTES de las rutas
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(rutasModuloProductos)


// Front Web
app.use(express.static(path.resolve('./front-web')))

// Vinculamos el front
app.use('/admin', express.static(path.resolve('./front-crud')))

// Configuramos carpeta para servir achivos
app.use('/archivos', express.static(path.resolve('./archivos')))

// Manejo de rutas de API no encontradas para evitar HTML inesperado
app.use('/api', (req, res) => {
  res.status(404).json({mensaje: 'Endpoint de API no encontrado'})
})

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})