import express from 'express'
import path from 'path'

const puerto = 3000

const app = express()


app.use(express.static(path.resolve('front')))

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})
