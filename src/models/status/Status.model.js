import { DataTypes as Dt, Model } from 'sequelize';
import dbcon from '../../db/db.js';

class Status extends Model {}

Status.init(
	{
		status: {
			type: Dt.STRING(50),
			allowNull: false,
		},
	},
	{
		sequelize: dbcon,
		modelName: 'Status',
		timestamps: false,
	}
);

export default Status;
