'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

//Prueba

function prueba(req, res){
    res.status(200).send({
        message: 'HOLA'
    });
}
//REGISTRARNOS
function registrar(req, res){
    var user = new User();
    var params = req.body;

      if(params.nombre && params.email && params.password){
        user.nombre = params.nombre;
        user.email = params.email;
        user.password = params.password;
        user.role = 'Usuario';
        user.image = null;

        //Controlar Usuarios Duplicados
        User.find({ $or: [
            {email: user.email.toLowerCase()},
            {nombre: user.nombre.toLowerCase()}
        ]}).exec((err, users) => {
            if(err) return res.status(500).send({message: 'Error en la peticion de usuarios'});

            if(users && users.length >= 1){
                return res.status(200).send({message: 'El usuario que intenta registrar ya existe'});
            }else{
                    //Cifra la password y guarda los datos
                bcrypt.hash(params.password, null, null, (err, hash) =>{
                    user.password = hash;

                    user.save((err, userStored)=>{
                        if(err) return res.status(500).send({message: 'Error al guardar el usuario'});

                        if(userStored){
                            res.status(200).send({user: userStored});
                        }else{
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }
                    });
                });
            }
        });

    
    }else{
        res.status(200).send({
            message: 'Rellena todos los campos necesarios!!!'
        });
    }
}

function login(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email}, (err, user) =>{
        if(err) return res.status(500).send({message: 'erro en la peticion'});

        if(user){
            bcrypt.compare(password, user.password,  (err, check)=>{
                if(check){
                    
                    if(params.gettoken){
                        //devolver token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        //devolver datos del usuario
                        user.password = undefined;
                        return res.status(200).send({user});
                    }
                   
                }else{
                    return res.status(404).send({message: 'el usuario no se a podido identificar'});
                }
            });
        }else{
            return res.status(404).send({message: 'el usuario no se a podido logear'});
        }
    });
}

module.exports = {
    registrar,
    login,
    prueba
}