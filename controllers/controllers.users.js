const {request, response} = require('express');

const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const getUsers = async (req, res) => {
    const {limit = 5, from} = req.query;
    const [total, users] = await Promise.all([
        User.countDocuments({status: true}),
        User.find({status: true})
          .skip(Number(from))
          .limit(Number(limit))
    ])
    res.json({
        total,
        users
        });
}

const getUserById = (req, res) => {
    res.json({
        msg: 'GET By ID Api --> Controllers'
    })
} 


const createUser = async (req, res) => {
    const {name, email, password, rol} = req.body;
    const user = new User({name, email, password, rol});
    //Encriptar Contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.status(201).json({
        user
    })
  }

const updateUser = async(req, res) => {
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;
    if(password){
      //Encriptar Contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, resto, {new: true});
    res.json(user);
  }

const deleteUser = async (req, res) => {
    const {id} = req.params;
    //Borrado Fisico
    //const user = await User.findByIdAndDelete(id);

    //Borrado Logico
    const user = await User.findByIdAndUpdate(id, {status: false}, {new: true});
    res.json({
        user
    })
  }

const updateUserComplete = (req, res) => {
    res.json({
        msg: 'PATCH Api --> Controllers'
    })
}





module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserComplete,
    deleteUser,
    updateUser
}