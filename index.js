require('dotenv').config()

const express = require('express')
const { DBTest } = require('./database.js')
const tareaModel = require('./tareaModel.js')

const app = express()
const PUERTO = process.env.PUERTO

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async function (req, res) {
    const tareas = await tareaModel.findAll()



    res.render('inicio', { tareas: tareas })
})

app.get('/agregar', function (req, res) {
    res.render('agregar')
})

app.post('/agregar', async function (req, res) {


    const { tarea, descripcion } = req.body

    try {

        const nuevaTarea = await tareaModel.create({
            nombre: tarea,
            descripcion: descripcion,
            imagen: 'https://cdn.avalos.sv/wp-content/uploads/default-featured-image.png'
        });

        if (nuevaTarea) {
            res.redirect('/');
        } else {
            res.send('No se puso agregar la tarea:( ')
        }
    } catch (err) {
        res.send('Se produjo un error al cargar la tarea: ' + err)
    }
})
app.get('/eliminar/:id', async function (req, res) {
    const { id } = req.params;

    try {
        const borrarTarea = await tareaModel.destroy({
            where: {
                id: id

            }
        })

        if (borrarTarea) {
            res.redirect('/');
        } else {
            res.send('No se puso borrar la tarea:( ')
        }
    } catch (err) {
        res.send('Se produjo un error al borrar la tarea: ' + err)
    }

})

app.get('/editar/:id', async function (req, res) {
    const { id } = req.params;

    try {
        const tarea = await tareaModel.findOne({
            where: {
                id: id
            }
        })

        if (tarea) {
            res.render('editar', { tarea: tarea })
        } else {
            res.send('No se puso editar la tarea:( ')
        }

    } catch (err) {
        res.send('Se produjo un error al editar la tarea: ' + err)
    }
})

app.post('/editar/:id', async function (req, res) {
    const { id } = req.params;
    const { tarea, descripcion } = req.body

    try {
        const tareaActualizada = await tareaModel.update(
            {
                nombre: tarea,
                descripcion: descripcion
            }, {
                where: {
                     id: id
                }
            }
        )

        if (tareaActualizada) {
            res.redirect('/');
        } else {
            res.send('No se puso actualizar la tarea:( ')
        }

    } catch (err) {
        res.send('Se produjo un error al actualizar la tarea: ' + err)
    }
})

DBTest()

app.listen(PUERTO, () => {
    console.log(`El servidor esta corriendo en el puerto  ${PUERTO}`)
})
