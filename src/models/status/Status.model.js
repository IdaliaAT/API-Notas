import { DataTypes as Dt, Model } from 'sequelize';
import dbcon from '../../db/db.js';

class Status extends Model {}

Status.init({
    status: {
        type: Dt.STRING(50),
        allowNull: false,
    },
    // La llave foranea (fK) debe ser el mismo tipo de dato que la llave primaria (pk). En este caso INTEGER.
    idUser: {
        type: Dt.INTEGER,
    }
}, {
    sequelize: dbcon,
    modelName: 'Status',
    timestamps: false,
});

export default Status;