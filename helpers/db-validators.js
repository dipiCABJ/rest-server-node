const Rol = require('../models/rol');
const User = require('../models/user');


const isValidRol = async (rol = '') => {
    const existsRol = await Rol.findOne({rol});
    if (!existsRol){
           throw new Error(`The rol ${rol} is not registered in database`);
    }
}

//Validar email
const existsEmail = async (email) => {
    const existeEmail = await User.findOne({email});
    if (existeEmail) {
       throw new Error(`Email: ${email} already exists`);
    }
}

const existsUserById = async (id) => {
    console.log('Esta validando ID');
    const existsUserById = await User.findById(id);
    if (!existsUserById) {
       throw new Error(`User does not exist with id: ${id}`);
    }
}

module.exports = {
    isValidRol,
    existsEmail,
    existsUserById
}