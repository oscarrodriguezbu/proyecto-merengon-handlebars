const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Para generar URL amigables
const slug = require('slug');
const shortid = require('shortid');

//Insercion a la base de datos
const contactoSchema = new mongoose.Schema({
     titulo: {
        type: String,
        required: [true, 'Por favor digite el título'],
        trime: true, //quitar espacios al texto
        minLength: [2, 'El título debe tener minimo 2 caracteres'],
        maxLength: [18, 'El título debe tener máximo 16 caracteres'],
        
    },
    /*
    apellido: {
        type: String,
        required: [true, 'Por favor digite su apellido'],
        trime: true,
        minLength: [2, 'El apellido debe tener minimo 2 caracteres'],
        maxLength: [16, 'El apellido debe tener máximo 16 caracteres'],
        validate: {
            validator: function (v) {
                return /^[a-zA-ZÀ-ÿ]{4,16}$/.test(v);
            },
            message: props => `${props.value} El apellido tiene solo puede contener letras.`
        },

    },
    correo: {
        type: String,
        required: [true, 'Por favor digite su correo'],
        trime: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v);
            },
        },

    }, */
    asunto: {
        type: String,
        required: [true, 'Por favor seleccione el asunto'],
        enum: ['Agradecimiento', 'Servicio al cliente', 'PQR', 'Otro'], /* If the value being set is not in this array, validation will fail. */
        /*  default: 0, */


    },
    mensaje: {
        type: String,
        required: [true, 'Por favor digite su mensaje'],
        trime: true,
        minLength: 4,
        maxLength: [5000, 'El mensaje es demasiado largo']//5000 porque el trix tiene imagenes y aumenta el tamaño
    },
    url: {
        type: String,
        lowercase: true
    },
    etiquetas: [String],
    rating: {
        type: String
    },
    fecha: {
        type: Date
    },
    author:{
        type: mongoose.Schema.ObjectId,
        ref: 'Usuarios',
        required: 'El autor es Requerido'
    }
}, 
{
    timestamps:true, //añade fecha de creacion y modificacion
    versionKey: false //quita el __v de mongodb
}
);

//esto se ejecuta antes de guardar
/*pre es un midelware de mongoose
el next es para pasar entre midlewares */
contactoSchema.pre('save', function (next) {
    const url = slug(this.asunto);
    this.url = `${url}-${shortid.generate()}`;
    /*por ejemplo desarrollador,  entonces
    se crea desarrollador-1 desarrollador-2 etc
    */
    next();
});

//contacto es como se va a llamar en el dbatlas
module.exports = mongoose.model('Contacto', contactoSchema);