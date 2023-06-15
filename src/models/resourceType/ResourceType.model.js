import { DataTypes as Dt, Model, TEXT } from "sequelize";
import dbcon from "../../db/db.js";

class ResourceType extends Model {}

ResourceType.init({
    resourceType: {
        type: Dt.STRING(100),
        allowNull: false,
    },
    image: {
        type: Dt.TEXT,
    },
    idUser: {
        type: Dt.INTEGER,
    }
}, {
    sequelize: dbcon,
    modelName: "ResourceType",
    timestamps: false,
})

export default ResourceType