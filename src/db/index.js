const mongoose = require('mongoose');

const setup = async () => {
  try {

    await mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
  
    let db = mongoose.connection;
    db.once('open', () => console.log("Conexion Establecida con mongodb"))
    db.on('error', (err) => console.log('MongoDB connection error: ', err))
  
  } catch (err) {
    throw new Error(err)
  }
}

setup();

