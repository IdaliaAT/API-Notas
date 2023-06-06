import { DataTypes as Dt, Model } from 'sequelize';
import dbcon from '../../db/db.js';

class Notes extends Model {}

Notes.init({
    noteId: {
        type: Dt.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    titleNote: {
        type: Dt.STRING,
    },
    text: {
        type: Dt.TEXT,
    },
    image: {
        type: Dt.TEXT,
    },
    idTopic: {
        type: Dt.INTEGER,
    },
}, {
    sequelize: dbcon,
    modelName: 'Notes',
    timestamps: false,
});

export default Notes;