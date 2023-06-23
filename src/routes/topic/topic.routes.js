import { Router } from 'express';
import TopicController from '../../controllers/topic/Topic.controller.js';

// Import Controller
// Para desestructurar se importa dentro de unas llaves, para no traernos toda la informacion de express, en este caso, por eso se puso Router entre llaves. Asi solo apunta a la informacion de Router (linea uno donde se importa solo el Router). Esto se utiliza no unicamente en import sino en otros arreglos u objetos lo llamas solamente.

const topicRoutes = Router();
// Con esto estamos asignando todo lo que traemos de Router a "materiaRoutes"
// Aqui solicita dos parametros.
// La ruta que esta arriba es la que manda, ejm linea 12.

//topicRoutes.get('/', TopicController.getAllTopics);
// TopicRoutes.get("/prueba", (req, res) => {
//     res.status(200).send("This is a test")
// })
topicRoutes.get('/:id', TopicController.getTopicById);
// En las lineas 13, 14 y 15 se pisan las rutas por usar el mismo verbo ejm get, porque estan al mismo nivel, pero si no tiene los : el id, no se pisan . Hay que darle otro nivel a mi ruta /….

topicRoutes.post('/', TopicController.createTopic);
topicRoutes.delete('/:id', TopicController.deleteTopic);
topicRoutes.put('/:id', TopicController.updateTopic);

export default topicRoutes;