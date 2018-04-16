'use strict'
const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/IN6AV').then(()=>{
    console.log('La conexion a la base de datos a sido exitosa');

    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), ()=>{
        console.log(`Servidor esta coorriendo en el puerto: '${ app.get('port')}'`);
    })
}).catch(err => console.log(err));