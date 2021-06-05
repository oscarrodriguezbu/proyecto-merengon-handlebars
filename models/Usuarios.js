const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true); //esto soluciona un warning: [0] (node:1504) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. 
const bcrypt = require('bcrypt');


const usuariosSchema = new mongoose.Schema({ //el schema es una copia del modelo
    email:{
        type: String,
        unique: true,
        lowercase:true,
        trim:true,
    },
    nombre:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    imagen: String,
    token:String,
    expira: Date //es un tiempo para que expire el token
}, 
{
    timestamps:true, //añade fecha de creacion y modificacion
    versionKey: false //quita el __v de mongodb
}

);


//Metodo hash de passwords - hooks (encriptar contraseña)
usuariosSchema.pre('save', async function(next){ // pre, antes que se guarde en la base de datos hace algo // hooks son operaciones que van antes o después de que se interactúan con la base de datos
    
    if(!this.isModified('password')){ //si el password esta hasheado no se hace nada 
        return next();
    }  //Si no esta hasheado hacerlo
   
    const hash = await bcrypt.hash(this.password, 12); // 12 es la cantidad de interacciones que se le hace a la contraseña para encriptarlo, se recomienda de 10 en adelante
    this.password = hash;
    next();
});


usuariosSchema.post('save', function(error, doc, next){ //envia el error atraves del midleware en el controlador
    if(error.name === 'MongoError' && error.code === 11000) {
        next('Este correo ya está registrado');
    } else {
        next(error);
    }
});


//Comparar los password para el inicio de sesion
usuariosSchema.methods={
    compararPassword: function(password){ //este es el password que se ingresa en la vista
        return bcrypt.compareSync(password, this.password); //el de la vista vs el de la base de datos desencriptado
    }
}

module.exports = mongoose.model('Usuarios', usuariosSchema);

