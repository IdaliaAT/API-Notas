import { DataTypes as Dt, Model } from 'sequelize';
import dbcon from '../../db/db.js';

class Category extends Model {}
Category.init(
	{
		name: {
			type: Dt.STRING(100),
			allowNull: false,
		},
		description: {
			type: Dt.TEXT,
		},
		idUser: {
			type: Dt.INTEGER,
		},
	},
	{
		sequelize: dbcon,
		modelName: 'Category',
		timestamps: false,
	}
);

export default Category;
