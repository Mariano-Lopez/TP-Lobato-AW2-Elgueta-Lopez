import express from 'express'
import path from 'path'

const puerto = 3000

const app = express()


app.use(express.static(path.resolve('front')))


app.get('/', (req, res) => {
  res.sendFile(path.resolve('front/index.html'))
})


app.get('/carta', (req, res) => {
  res.sendFile(path.resolve('front/carta.html'))
})

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})
