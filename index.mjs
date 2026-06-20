// Modulos --------------------------------------------------------------------------------------------------
import express from 'express'
import path from 'node:path'
import './iniciar.env.mjs'
import rutasModuloProductos from './modulos/productos/rutas.productos.mjs'
//
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import pool from './bbdd/conexion-bd.mjs'


const puerto = process.env.puerto || 3000

const app = express()



app.use(cookieParser(process.env.COOKIE_FIRMA))

// Agregar estos middlewares ANTES de las rutas
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(rutasModuloProductos)


// ..............................................
function chequearAcceso(req, res, next){
    const token = req.signedCookies['token']

    jwt.verify(token, process.env.JWT_FIRMA, function(error, decoded){
        if(error){
            res.redirect('/login')
        }
        next()
    })
}
// ..............................................


// Servir el front Web (publico)
app.use(express.static(path.resolve('./fronts/front-web')))

// Servir el front crud (admin)
app.use('/admin', chequearAcceso, express.static(path.resolve('./fronts/front-crud')))

// Servir el front login (admin)
app.use('/login', express.static(path.resolve('./fronts/front-login')))

// Configuramos carpeta para servir achivos
app.use('/archivos', express.static(path.resolve('./archivos')))

// Manejo de rutas de API no encontradas para evitar HTML inesperado
app.use('/api', (req, res) => {
  res.status(404).json({mensaje: 'Endpoint de API no encontrado'})
})




// Configuración de rutas para autenticación y registro ---------------------------------------------------------------

app.post('/autenticar', async (req, res)=>{
    // 1- Obtener datos del formulario
    const {usuario, pass} = req.body

    // 2- Controlar datos incompletos
    if(!usuario || !pass){
        return res.status(404).json({
            mensaje: "Datos incompletos."
        })
    }

    // 3- Verificar si el usuario existe en la BBDD
    const resultado = await pool.query(`
        SELECT 
            *
        FROM 
            usuarios
        WHERE
            username = $1
        `, [usuario])

    console.log(resultado.rows)

    if (resultado.rowCount === 0){
        return res.status(404).json({
            mensaje: "Usuario no encontrado."
        })
    }

    // 4- Verificar que la contraseña ingresada coincida con el hash guardado en la BBDD
    const hash = resultado.rows[0].password_hash // --> Obtenemos el hash del usuario encontrado

    const validacion = await bcrypt.compare(pass, hash); // --> Devuelve true o false

    // 5- Si el booleano es false, mostrar mensaje de error, sino, generar cookie y redigir a admin
    if (!validacion){
        return res.status(404).json({
            mensaje: "Contraseña incorrecta."
        })
    }
    else{
        // "Payload":
        const datosUsuario = {
            id: resultado.rows[0].id,
            usuario: resultado.rows[0].username,
            contraseña: resultado.rows[0].password_hash
        };
        
        // La funcion jwt.sign() espera recibir un objeto "payload", por esa razón, anteriormente se crea uno conteniendo los datos del usuario.
        const token = jwt.sign(datosUsuario, process.env.JWT_FIRMA, {expiresIn: '1h'})
        
        res.cookie('token', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 300000 // <-- (5 minutos)
        })

        return res.status(200).redirect('/admin')
    } 
})


app.post('/registrar', async (req, res) => {
    // 1- Obtener datos del formulario
    const { usuario, pass } = req.body;

    // 2- Controlar datos incompletos
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }

    // 3- Hashear la contraseña ingresada por el usuario, y guardarlo junto al nombre en la base de datos
    try {
        const salt = bcrypt.genSaltSync(10);

        const hashingPass = bcrypt.hashSync(pass, salt);

        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );

        if (resultado.rowCount > 0) {
            res.redirect('/login'); // Redirigimos al usuario a la página de login
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})