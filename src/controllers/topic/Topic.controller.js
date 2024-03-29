import { Category, Topic, TopicCategory } from '../../models/index.js';
// Hay 2 metodos de clase:  instancia y clase.
// SubjectController es el metodo de clase en este caso.
class TopicController {

    static async getAllTopics(req, res) {
        try {
            const { idUser } = req.params
                // const topics = await Category.findAll({
                //     where: { idUser },
                //     attributes: ["id", "name"],
                //     include: {
                //         model: Topic,
                //         through: {
                //             attributes: [],
                //         },
                //         attributes: ["id", "name"],
                //     }
                // });
            const topics = await Topic.findAll({
                    attributes: ['id', 'name'],
                    include: {
                        model: Category,
                        through: {
                            attributes: []
                        },
                        attributes: ["name"],
                        where: {
                            idUser
                        }
                    }
                }, )
                //console.log("🚀 ~ file: Topic.controller.js:20 ~ TopicController ~ getAllTopics ~ topics:", topics)
            if (!topics.length) throw { message: "There are no topics", codeStatus: 404 }
            res.status(200).send({ success: true, message: "These are all of your Topics", results: topics })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async getTopicById(req, res) {
        try {
            const { id } = req.params;
            const topic = await Topic.findByPk(id, {
                attributes: ["id", "name", "idStatus"]
            })
            if (!topic) throw { message: "Topic not found", codeStatus: 404 }
            res.status(202).send({ success: true, message: "This is your Topic", results: topic })
        } catch (err) {
            const codeStatus = err.CodeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async createTopic(req, res) {
            try {
                const { name, description, image, idStatus, idCategory } = req.body;
                //console.log("🚀 ~ file: Topic.controller.js:13 ~ TopicController ~ createTopic ~ idCategory:", idCategory)

                if (!name || !idCategory) throw { message: 'Every cannot be empty', codeStatus: 400 };
                //  Para hacer el creationDate para que cuando se cree el topico se agregue la fecha en automatico

                const topic = await Topic.create({ name, description, creationDate: new Date(), image, idStatus });
                //console.log("🚀 ~ file: Topic.controller.js:17 ~ TopicController ~ createTopic ~ topic:", topic) // este es para saber que condicion usar en la linea 20.
                //console.log("🚀 ~ file: Topic.controller.js:23 ~ TopicController ~ createTopic ~ idCategory:", idCategory) // este es para que nos devolve y utilizarlo en la linea 24.
                if (!topic)
                    throw { message: 'There is an unexpected error, Topic is not created', codeStatus: 500 };
                // Se procede a asociar el Topico recien creado con un Categoria existente.  Estas relaciones se crean en la tabla intermedia Topic_Category, en esta tabla solo se guardan las llaves de las tablas que estan relacionadas.                

                let topic_Category = null

                if (idCategory.length === 1) { // Si el idCategory tiene una longitud de un 1 damos por sentado que es un elemento. 
                    // porque si tiene mas de 1 elemento seria un Array.
                    topic_Category = await TopicCategory.create({ idCategory, idTopic: topic.id }) // Al crear topic, sequelize crea un id en automatico.
                    if (!topic_Category) throw { message: 'There is an unexpected error Topic is not created', codeStatus: 500 }

                } else { // de lo contrario
                    idCategory.forEach(async element => { //Si es array, recorremos el idCategory con un forEach y recibe una call back que espera un parametro que tenga el elemento que estamos iterando (primero 0, luego 1, ...) hasta la longitud del array - 1. 
                        topic_Category = await TopicCategory.create({ idCategory: element, idTopic: topic.id })
                        if (!topic_Category) throw { message: 'There is an unexpected error Topic is not created', codeStatus: 500 }
                    })
                }
                res.status(201).send({ success: true, message: 'Your Topic has been created successfully' });
            } catch (err) {
                const codeStatus = err.codeStatus || 500;
                const message = err.message || 'Internal server error';
                res.status(codeStatus).send({ success: false, message });
                //  res.status(err.codeStatus).send({ success: false, message: err.message })
                //  Convencion
            }
        }
        /* Explicacion del "Bloque try - catch"   linea 14 en adelante.
                Se declara el objeto del body ejm. name y description.
                Linea 15    Con lo que empezamos es con desestructurar, en este caso name y description.
                Linea 16 Si la informacion que alimenta el cliente no trae nada, esta vacio, en este caso el name, arroja un mensaje con un codeStatus 400 que dice que ese input no debe estar vacio. No permite null, tiene que llevar algo.
                Y en caso de que si trae informacion, manda un mensaje exitoso de que ha sido creado.
                Linea 19 En caso de que exista un error diferente por ejemplo de problema del servidor.
                linea 20 Si no es el error codeStatus que yo lance entonces manda res.status 500.
              Como 
                    // { name, description}              Homework
                // vamos a requerir */

    static async createTopicToCategory(req, res) {
        try {
            const { idCategory } = req.params
            const { name, description, image, idStatus } = req.body
            if (!name) throw { message: "Your fields cannot be empty", codeStatus: 400 }
            const topicCreated = await Topic.create({ name, description, creationDate: new Date(), image, idStatus })
            if (!topicCreated) throw { message: "Topic to Category is not created", codeStatus: 500 }
            const topicCategory = await TopicCategory.create({ idCategory, idTopic: topicCreated.id })
            if (!topicCategory) throw { message: "Topic in this Category is not created", codeStatus: 500 }
            res.status(200).send({ success: true, message: "Your topic for this Category has been created" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async updateTopic(req, res) {
            try {
                const { id } = req.params
                const { name, description, image, idStatus } = req.body
                if (!name) throw { message: "Your name cannot be empty", codeStatus: 400 }
                const topicUpdate = await Topic.update({ name, description, image, idStatus }, {
                        where: {
                            id,
                        }
                    })
                    //console.log("🚀 ~ file: Topic.controller.js:138 ~ TopicController ~ updateTopic ~ topicUpdate:", topicUpdate[0])
                if (!topicUpdate[0]) throw { message: "Your Topic was not updated", codeStatus: 500 }
                res.status(200).send({ success: true, message: "Your Topic was updated successfully" })
            } catch (err) {
                const codeStatus = err.codeStatus || 500
                const message = err.message || "Internal Server Error"
                res.status(codeStatus).send({ success: false, message })
            }
        }
        // Se trabaja con el id params en la operacion update para agregarlo en la condicion y asi no afecte todos los registros. No olvidar el where.   }
        // Se trabaja con el id params en la operacion delete para agregarlo en la condicion y asi no afecte todos los registros. No olvidar el where.
    static async deleteTopic(req, res) { // Esta parte no la he probado.  Junio 27 del 2023
        try {
            const { id } = req.params
            const topic = await Topic.destroy({
                where: { id }
            })
            if (!topic) throw { message: "There is no Topic to delete", codeStatus: 400 }
            res.status(202).send({ success: true, message: "Your Topic has been deleted" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message });
        }
    }
}
export default TopicController;