import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import routes from './routes/index.js';
import dbcon from './db/db.js';

const port = process.env.API_PORT || 3000;
const app = express(); // Igualamos app a express
//Los metodos de clase los vas a utilizar en modelos
//Los metodos son funciones que se crean en una clase, son las acciones de una clase o de un objeto. Ejm. perro, clase ladrar.

// Metodo use
app.use(express.json()); // este es un middleware y es para interpretar informacion en json, asi te comunicas con el server.
app.use(express.urlencoded({ extended: true })); // este es para que entienda el request de un formalario, te lo decodifica y extiende a formato json o parsea a formato json.
app.use(morgan('tiny'));
app.use('/api', routes); // Aqui es la ruta donde vive el server y dentro de routes busca como se secciona las rutas o  vifurcaciones.

// Una callback es una funcion que se envia como argumento dentro de una funcion.

// Aqui hacemos una promesa de conectarse a la base de datos. Y se levanta el servidor conectado con la base de datos.

// Acceder a un metodo llamando a la instancia que es dbon y luego al metodo que es sync (u authenticate, etc.)

await dbcon.sync({ force: false }).then(() => {
	app.listen(port, () => {
		console.log('Servidor Ok');
	});
});
