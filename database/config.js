const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Database online!');
    } catch (err) {
        console.log(err);
        throw new Error('Error connecting to database');
    }
}

module.exports = {
    dbConnection
}