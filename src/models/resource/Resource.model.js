import { DataTypes as Dt, Model } from 'sequelize';
import dbcon from '../../db/db.js';

class Resource extends Model {}
Resource.init({
    titleResource: {
        type: Dt.STRING,
        allowNull: false,
    },
    description: {
        type: Dt.TEXT,
        allowNull: false,
    },
    url: {
        type: Dt.TEXT,
        allowNull: false,
    },
    idResourceType: {
        type: Dt.INTEGER,
        allowNull: false,
    },
    idTopic: {
        type: Dt.INTEGER, // La llave foranea (foreingKey) siempre tiene que tener el mismo tipo de dato que la llave primaria de tabla original.
    },
}, {
    sequelize: dbcon,
    modelName: 'Resource',
    timestamps: false,
});

export default Resource;