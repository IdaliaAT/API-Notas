import { DataTypes as Dt, Model } from 'sequelize';
import dbcon from '../../db/db.js';

class Topic extends Model {}
Topic.init({
    name: {
        type: Dt.STRING(100),
        allowNull: false,
    },
    description: {
        type: Dt.TEXT,
    },
    creationDate: {
        type: Dt.DATEONLY,
    },
    image: {
        type: Dt.TEXT,
    },
    idStatus: {
        type: Dt.INTEGER,
    },
}, {
    sequelize: dbcon,
    modelName: 'Topic',
    timestamps: false, // Para quitar campos de cuando se creo y cuando se actualizo un registro "update and create" que se generaron cuando se crea la tabla o modelo.
});

export default Topic;