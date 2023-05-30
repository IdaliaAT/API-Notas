import { DataTypes as Dt, Model } from 'sequelize';
import dbcon from '../../db/db.js';

class TopicCategory extends Model {}

TopicCategory.init(
	{
		idTopic: {
			type: Dt.INTEGER,
			allowNull: false,
		},
		idCategory: {
			type: Dt.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize: dbcon,
		modelName: 'Topic_Category',
		timestamps: false,
	}
);

export default TopicCategory;
