import { Sequelize } from "sequelize";
import "dotenv/config"

// Instanciar un objeto es const dbcon = new Sequelize
// Instanciar es hacer referencia a una clase. Ejm. dbcon.authenticate
// dbcon es el objeto.
// new palabra reservada que se utiliza para instanciar objetos de clase.
// Sequelize es la clase que contiene todos los metodos, ejm. authenticate. Las clases se inician con mayusculas.
// A continuacion te traes lo que tienes en el .env y lo seteas a la const dbName
// En base de datos los metodos son SELECT, CREATE, INSERT, UPDATE Y DELETE.


const dbName = process.env.DB_NAME
const dbUserName = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT

const dbcon = new Sequelize(dbName, dbUserName, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    port: dbPort
});
try {
    await dbcon.authenticate()
    console.log("Conexion realizada exitosamente")
} catch (error) {
    console.log("Ha ocurrido un error", error)
}

export default dbcon