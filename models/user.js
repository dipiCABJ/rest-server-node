const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required!']
    },
    email: {
        type: String,
        required: [true, 'The email is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required!']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, 'The rol is required!'],
        enum: ['ADMIN_ROL', 'USER_ROL']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

UserSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);