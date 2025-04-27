const {Schema, model} = require('mongoose');

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'rol is require']
    }
});

module.exports = model('Rol', RolSchema);