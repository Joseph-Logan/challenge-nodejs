const mongoose = require('mongoose');

const setup = async () => {
  try {

    await mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    console.log("Conexion Establecida con mongodb")
  } catch (err) {
    console.log('MongoDB connection error: ', err)
    throw new Error(err)
  }
}

setup();

