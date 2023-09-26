const { DataTypes } = require('sequelize');
const { sequelize } = require('./database.js');

const Tarea = sequelize.define('tarea', {
    nombre: {
        type: DataTypes.STRING,

    },
    descripcion: {
        type: DataTypes.STRING,
    },
    imagen: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
    tambleName: 'tareas',

});

module.exports = Tarea;