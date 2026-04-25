import express from 'express'

const puerto = 3000

const app = express()

app.get('/', (req, res) => {
  res.send('JUV 1- MAN UTD 2')
})

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})
