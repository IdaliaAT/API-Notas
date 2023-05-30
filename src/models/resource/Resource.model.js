import { DataTypes as Dt, Model } from 'sequelize';
import dbcon from '../../db/db.js';

class Resource extends Model {}
Resource.init(
	{
		resourceType: {
			type: Dt.STRING(100),
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
		idTopic: {
			type: Dt.INTEGER, // La llave foranea (foreingKey) siempre tiene que tener el mismo tipo de dato que la llave primaria de tabla original.
		},
	},
	{
		sequelize: dbcon,
		modelName: 'Resource',
		timestamps: false,
	}
);

export default Resource;
