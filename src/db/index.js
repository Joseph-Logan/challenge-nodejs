const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

let db = mongoose.connection;
db.once('open', () => console.log("Conexion Establecida con mongodb"))
db.on('error', (err) => console.log('MongoDB connection error: ', err))

module.exports = mongoose
